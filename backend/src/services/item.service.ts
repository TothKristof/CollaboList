import { prisma } from "../prismaClient";
import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import { handlePrismaError } from "../errors/prismaErrorHandler";
import {
  NotFoundError,
  ExternalServiceError,
  ParseError,
  UnauthorizedError,
} from "../errors/AppError";
import { Context } from "../types/context";
import { requireAuth } from "../utils/auth";
import { listService } from "./list.service";

async function fetchPriceFromUrl(url: string): Promise<number> {
  let html: string;

  try {
    const response = await axios.get(url, { timeout: 8000 });
    html = response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ExternalServiceError(
        url,
        error.response
          ? `HTTP ${error.response.status}`
          : "Network error or timeout"
      );
    }
    throw new ExternalServiceError(url);
  }

  const $ = cheerio.load(html);
  const priceText = $(".price").first().text();
  const numericPrice = parseInt(priceText.replace(/\D/g, ""), 10);

  if (!numericPrice || isNaN(numericPrice)) {
    throw new ParseError("price — .price selector returned no valid number");
  }

  return numericPrice;
}

async function fetchImageFromUrl(url: string): Promise<string> {
  let html: string;

  try {
    const response = await axios.get(url, { timeout: 8000 });
    html = response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ExternalServiceError(
        url,
        error.response ? `HTTP ${error.response.status}` : "Network error or timeout"
      );
    }
    throw new ExternalServiceError(url);
  }

  const $ = cheerio.load(html);
  const imgSrc = $('.product-image-wrapper img').attr('src');

  if (!imgSrc) throw new ParseError('No image found for selector ".product-image-wrapper img"');

  return imgSrc;
}

async function getItemById(itemId: number, context: Context) {
  requireAuth(context);
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundError("Item");
    if (item.ownerId !== context.userId) throw new UnauthorizedError();


    return item;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    handlePrismaError(error);
  }
}

async function getUserRecentlyAddedItems(context: Context) {
  requireAuth(context);
  try {
    return await prisma.item.findMany({
      where: {
        ownerId: context.userId,
      },
      include: {
        list: true,
      },
      orderBy: {
        addDate: "desc",
      },
      take: 6,
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function updatePriceOfItem(itemId: number, newPrice: number) {
  try {
    return await prisma.item.update({
      where: { id: itemId },
      data: { price: newPrice, lastUpdatedDate: new Date() },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function deleteItem(context: Context, itemId: number) {
  requireAuth(context);

  const item = await getItemById(itemId, context);
  if (!item) throw new NotFoundError("Item");
  if (item.listId) await listService.requireEditPermission(context, item.listId);

  try {
    return await prisma.item.delete({ where: { id: itemId } });
  } catch (error) {
    handlePrismaError(error);
  }
}

async function updatePriceFromUrl(context: Context, itemId: number) {
  requireAuth(context);

  const item = await getItemById(itemId, context);
  if (!item) throw new NotFoundError("Item");
  if (item.listId) await listService.requireEditPermission(context, item.listId);

  const numericPrice = await fetchPriceFromUrl(item.link);
  return updatePriceOfItem(itemId, numericPrice);
}

async function updateAllPricesFromUrl(context: Context, listId: number) {
  await listService.requireEditPermission(context, listId);

  try {
    const items = await prisma.item.findMany({ where: { listId } });

    const results = await Promise.allSettled(
      items.map(async (item) => {
        const numericPrice = await fetchPriceFromUrl(item.link);
        return prisma.item.update({
          where: { id: item.id },
          data: { price: numericPrice, lastUpdatedDate: new Date() },
        });
      })
    );

    return results
      .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof prisma.item.update>>> => r.status === "fulfilled")
      .map((r) => r.value);
  } catch (error) {
    handlePrismaError(error);
  }
}

async function addItemToList(
  context: Context,
  listId: number,
  name: string,
  price: number,
  link: string,
  imgLink: string
) {
  requireAuth(context);
  await listService.requireEditPermission(context, listId);

  try {
    const list = await prisma.list.findUnique({ where: { id: listId } });
    if (!list) throw new NotFoundError("List");

    const item = await prisma.item.create({
      data: {
        name,
        price,
        link,
        imgLink,
        category: list.category,
        addDate: new Date(),
        lastUpdatedDate: new Date(),
        owner: { connect: { id: context.userId as number } },
        list: { connect: { id: listId } }
      }
    })

    return item;
  } catch (error) {
    handlePrismaError(error);
  }
}

export const itemService = {
  fetchPriceFromUrl,
  fetchImageFromUrl,
  getItemById,
  getUserRecentlyAddedItems,
  updatePriceOfItem,
  deleteItem,
  updateAllPricesFromUrl,
  updatePriceFromUrl,
  addItemToList
};