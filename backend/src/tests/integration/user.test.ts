import { userService } from "../../services/user.service";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup";
import { seedUser, seedList } from "../helpers/seed";
import { NotFoundError, UnauthorizedError, ValidationError } from "../../errors/AppError";

beforeEach(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await disconnectDatabase();
});

describe("userService", () => {
    describe("register", () => {
        it("should create a new user", async () => {
            const user = await userService.register("new@test.com", "password123", "New");
            expect(user).toMatchObject({ email: "new@test.com" });
        });

        it("should throw ValidationError on duplicate email", async () => {
            const user1 = await seedUser();
            await expect(
                userService.register(user1.email, "password123", "TestMember")
            ).rejects.toThrow(ValidationError);
        });
    });

    describe("findUserByEmail", () => {
        it("should return user if exists", async () => {
            const seeded = await seedUser();
            const user = await userService.findUserByEmail(seeded.email);
            expect(user?.email).toBe(seeded.email);
        });

        it("should throw NotFoundError if user does not exist", async () => {
            await expect(
                userService.findUserByEmail("nobody@test.com")
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe("fetchLoggedInUser", () => {
        it("should return the logged in user", async () => {
            const seeded = await seedUser();
            const fetchedUser = await userService.fetchLoggedInUser({
                userId: seeded.id,
                res: {} as any
            });
            expect(fetchedUser).toMatchObject({ email: seeded.email });
        });

        it("should return unauthorized error", async () => {
            await expect(
                userService.fetchLoggedInUser({
                    userId: undefined,
                    res: {} as any,
                })
            ).rejects.toThrow(UnauthorizedError);
        });

        it("should return NotFoundError", async () => {
            await expect(
                userService.fetchLoggedInUser({
                    userId: 9999,
                    res: {} as any,
                })
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe("findUserByText", () => {
        it("should return users matching email", async () => {
            const seeded = await seedUser();
            const users = await userService.findUserByText(seeded.email);
            expect(users).toContainEqual(expect.objectContaining({ email: seeded.email }));
        });

        it("should return users matching username", async () => {
            const seeded = await seedUser();
            const users = await userService.findUserByText(seeded.username);
            expect(users).toContainEqual(expect.objectContaining({ username: seeded.username }));
        });

        it("should be case insensitive", async () => {
            const seeded = await seedUser();
            const users = await userService.findUserByText(seeded.email.toUpperCase());
            expect(users).toContainEqual(expect.objectContaining({ email: seeded.email }));
        });

        it("should throw NotFoundError if no user matches", async () => {
            await expect(
                userService.findUserByText("nonexistent_xyz")
            ).rejects.toThrow(NotFoundError);
        });
    });

    describe("getRoleInList", () => {
        it("should return the role of the user in the list", async () => {
            const seeded = await seedUser();
            const list = await seedList(seeded.id);
            const role = await userService.getRoleInList(list.id, seeded.id);
            expect(role).toBe("OWNER");
        });

        it("should throw NotFoundError if user is not a member of the list", async () => {
            const seeded = await seedUser();
            const list = await seedList(seeded.id);
            const outsider = await seedUser();
            await expect(
                userService.getRoleInList(list.id, outsider.id)
            ).rejects.toThrow(NotFoundError);
        });
    });
});