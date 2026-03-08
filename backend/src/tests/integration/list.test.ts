import { listService } from "../../services/list.service";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup";
import { seedList, seedUser } from "../helpers/seed.js";
import { UnauthorizedError } from "../../errors/AppError.js";

beforeEach(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await disconnectDatabase();
});

describe("userService", () => {
    describe("getAllListOfUser", () => {
        it("should return lists of user", async () => {
            const user = await seedUser();
            await seedList(user.id);
            await seedList(user.id);

            const lists = await listService.getAllListOfUser({ userId: user.id, res: {} as any });
            expect(lists).toHaveLength(2)
        })

        it("should throw Unauthorized error", async () => {
            await expect(listService.getAllListOfUser({ userId: undefined, res: {} as any }))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should return empty array of lists", async () => {
            const user = await seedUser();

            const lists = await listService.getAllListOfUser({ userId: user.id, res: {} as any });
            expect(lists).toHaveLength(0);
        })
    })

    describe("getListById", () => {
        it("should return one list data", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);

            const lists = await listService.getListById({ userId: user.id, res: {} as any }, list.id);
            expect(lists).toMatchObject({ name: "Test List" })
        })

        it("should throw Unauthorized error", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            await expect(listService.getListById({ userId: undefined, res: {} as any }, list.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw Unauthorized error", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            
            await expect(listService.getListById({ userId: 2, res: {} as any }, list.id))
            .rejects
            .toThrow(UnauthorizedError)
        })
    })


})