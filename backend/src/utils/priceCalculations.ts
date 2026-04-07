import { PriceHistory } from "../generated/prisma";

export function calculatePriceDifferencePercentage(price: number, lowestPrice: number) {
    return Number((((price - lowestPrice) / lowestPrice) * 100).toFixed(1));
}

export function calculateEveryDayLowestPrice(priceHistory: PriceHistory[]) {
    const byDay = new Map<string, PriceHistory>();

    for (const ph of priceHistory) {
      const dayKey = new Date(ph.recordedAt).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
      const current = byDay.get(dayKey);

      if (!current) {
        byDay.set(dayKey, ph);
        continue;
      }

      if (ph.price < current.price) {
        byDay.set(dayKey, ph);
        continue;
      }

      if (ph.price === current.price) {
        const phTime = new Date(ph.recordedAt).getTime();
        const curTime = new Date(current.recordedAt).getTime();
        if (phTime < curTime) byDay.set(dayKey, ph);
      }
    }

    return [...byDay.values()].sort(
      (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    );
}


export const priceCalculations = {
    calculatePriceDifferencePercentage,
    calculateEveryDayLowestPrice
};