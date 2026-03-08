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

async function getItemById(itemId: number, context: Context) {
  requireAuth(context);
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundError("Item");
    if(item.ownerId !== context.userId) throw new UnauthorizedError();


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

async function updatePriceOfItem(itemId: number, numericPrice: number) {
  try {
    return await prisma.item.update({
      where: { id: itemId },
      data: {
        price: numericPrice,
        lastUpdatedDate: new Date(),
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export const itemService = {
  fetchPriceFromUrl,
  getItemById,
  getUserRecentlyAddedItems,
  updatePriceOfItem,
};