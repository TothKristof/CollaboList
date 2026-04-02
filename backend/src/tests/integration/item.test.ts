import { itemService } from "../../services/item.service.js";
import { NotFoundError, UnauthorizedError } from "../../errors/AppError.js";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup.js";
import { seedItem, seedList, seedUser } from "../helpers/seed.js";
import { listService } from "../../services/list.service.js";
import { ListRole } from "../../generated/prisma/index.js";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(async () => {
    await resetDatabase();
    mockedAxios.get.mockResolvedValue({
        data: '<html><span class="price">9 999 Ft</span></html>'
    });
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

    describe("deleteItem", () => {
        it("should delete an item", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            const deleted = await itemService.deleteItem({ userId: user.id, res: {} as any }, item.id);
            expect(deleted?.id).toBe(item.id);
        });

        it("should throw NotFoundError if item does not exist", async () => {
            const user = await seedUser();

            await expect(itemService.deleteItem({ userId: user.id, res: {} as any }, 9999))
                .rejects
                .toThrow(NotFoundError);
        });

        it("should throw UnauthorizedError if user is not authenticated", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            await expect(itemService.deleteItem({ userId: undefined, res: {} as any }, item.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError if user is GUEST on the list", async () => {
            const owner = await seedUser();
            const guest = await seedUser();
            const list = await seedList(owner.id);
            const item = await seedItem(owner.id, list.id);

            await listService.addNewMemberToList({ userId: owner.id, res: {} as any }, guest.id, list.id, ListRole.GUEST);

            await expect(itemService.deleteItem({ userId: guest.id, res: {} as any }, item.id))
                .rejects
                .toThrow(UnauthorizedError);
        });
    });

    describe("updatePriceFromUrl", () => {
        it("should update price from url", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            const updated = await itemService.updatePriceFromUrl({ userId: user.id, res: {} as any }, item.id);
            expect(updated?.price).toBeDefined();
        });

        it("should throw NotFoundError if item does not exist", async () => {
            const user = await seedUser();

            await expect(itemService.updatePriceFromUrl({ userId: user.id, res: {} as any }, 9999))
                .rejects
                .toThrow(NotFoundError);
        });

        it("should throw UnauthorizedError if user is not authenticated", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            const item = await seedItem(user.id, list.id);

            await expect(itemService.updatePriceFromUrl({ userId: undefined, res: {} as any }, item.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError if user is GUEST on the list", async () => {
            const owner = await seedUser();
            const guest = await seedUser();
            const list = await seedList(owner.id);
            const item = await seedItem(owner.id, list.id);

            await listService.addNewMemberToList({ userId: owner.id, res: {} as any }, guest.id, list.id, ListRole.GUEST);

            await expect(itemService.updatePriceFromUrl({ userId: guest.id, res: {} as any }, item.id))
                .rejects
                .toThrow(UnauthorizedError);
        });
    });

    describe("updateAllPricesFromUrl", () => {
        it("should update all prices in a list", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            await seedItem(user.id, list.id);
            await seedItem(user.id, list.id);

            const results = await itemService.updateAllPricesFromUrl({ userId: user.id, res: {} as any }, list.id);
            expect(results?.length).toBe(2);
        });

        it("should throw UnauthorizedError if user is not authenticated", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);

            await expect(itemService.updateAllPricesFromUrl({ userId: undefined, res: {} as any }, list.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError if user is GUEST on the list", async () => {
            const owner = await seedUser();
            const guest = await seedUser();
            const list = await seedList(owner.id);

            await listService.addNewMemberToList({ userId: owner.id, res: {} as any }, guest.id, list.id, ListRole.GUEST);

            await expect(itemService.updateAllPricesFromUrl({ userId: guest.id, res: {} as any }, list.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should return only successfully updated items", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            await seedItem(user.id, list.id);

            const results = await itemService.updateAllPricesFromUrl({ userId: user.id, res: {} as any }, list.id);
            expect(Array.isArray(results)).toBe(true);
        });
    });
})
