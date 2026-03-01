import { prisma } from "../prismaClient";
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchPriceFromUrl(url: string): Promise<number> {
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);
  const priceText = $(".price").first().text();
  const numericPrice = parseInt(priceText.replace(/\D/g, ""));

  if (!numericPrice) {
    throw new Error("Price not found");
  }

  return numericPrice;
}

export async function getItemOrThrow(itemId: number) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
}