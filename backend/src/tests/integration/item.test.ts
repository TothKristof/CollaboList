import { itemService } from "../../services/item.service.js";
import { NotFoundError, UnauthorizedError } from "../../errors/AppError.js";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup.js";
import { seedItem, seedList, seedUser } from "../helpers/seed.js";

beforeEach(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await disconnectDatabase();
});

describe("itemService", () => {
    describe("getItemById", () => {
        it("should return an item", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            const found = await itemService.getItemById(item.id, { userId: user.id, res: {} as any });
            expect(found?.name).toBe("Test Item");
        });

        it("should throw NotFoundError if item does not exist", async () => {
            const user = await seedUser();
            await expect(itemService.getItemById(9999, { userId: user.id, res: {} as any })).rejects.toThrow(NotFoundError);
        });

        it("should throw NotFoundError if item does not exist", async () => {
            const user = await seedUser();

            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);
            await expect(itemService.getItemById(item.id, { userId: 2, res: {} as any })).rejects.toThrow(UnauthorizedError);
        });
    });

    describe("updatePriceOfItem", () => {
        it("should update item price", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            const updated = await itemService.updatePriceOfItem(item.id, 5000);
            expect(updated?.price).toBe(5000);
        });

        it("should throw NotFoundError for non-existent item", async () => {
            await expect(
                itemService.updatePriceOfItem(9999, 5000)
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe("getUserRecentlyAddedItems", () => {
        it("should return user last 6 added item", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);

            for (let i = 0; i < 8; i++) {
                await seedItem(user.id, list.id);
            }

            const userDatas = await itemService.getUserRecentlyAddedItems({ userId: user.id, res: {} as any });

            expect(userDatas).toHaveLength(6);
        });

        it("should throw Unauthorized error", async () => {
            await expect(itemService.getUserRecentlyAddedItems({ userId: undefined, res: {} as any }))
                .rejects
                .toThrow(UnauthorizedError);
        });
    });
})
