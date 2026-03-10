import { userService } from "../../services/user.service";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup";
import { seedUser, resetUserCount } from "../helpers/seed";
import { NotFoundError, UnauthorizedError, ValidationError } from "../../errors/AppError";

beforeEach(async () => {
    await resetDatabase();
    resetUserCount()
});

afterAll(async () => {
    await disconnectDatabase();
});

describe("userService", () => {
    describe("register", () => {
        it("should create a new user", async () => {
            const user = await userService.register("new@test.com", "password123");
            expect(user).toMatchObject({ email: "new@test.com" });
        });

        it("should throw ValidationError on duplicate email", async () => {
            await seedUser();
            await expect(
                userService.register("test1@test.com", "password123")
            ).rejects.toThrow(ValidationError);
        });
    });

    describe("findUserByEmail", () => {
        it("should return user if exists", async () => {
            await seedUser();
            const user = await userService.findUserByEmail("test1@test.com");
            expect(user?.email).toBe("test1@test.com");
        });

        it("should throw NotFoundError if user does not exist", async () => {
            await expect(
                userService.findUserByEmail("nobody@test.com")
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe("fetchLoggedInUser", () => {
        it("should return the logged in user", async () => {
            const user = await seedUser();
            const fetchedUser = await userService.fetchLoggedInUser({
                userId: user.id,
                res: {} as any
            });
            expect(fetchedUser).toMatchObject({ email: "test1@test.com" });
        });

        it("should return unauthorized error", async () => {
            await expect(
                userService.fetchLoggedInUser({
                    userId: undefined,
                    res: {} as any,
                })
            ).rejects.toThrow(UnauthorizedError);
        });
    });
});