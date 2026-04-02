import { listService } from "../../services/list.service";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup";
import { seedList, seedSharedList, seedUser } from "../helpers/seed.js";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../errors/AppError.js";
import { Category, ListRole } from "../../generated/prisma";

beforeEach(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await disconnectDatabase();
});

describe("listService", () => {
    describe("getAllListOfUser", () => {
        it("should return lists of user", async () => {
            const user1 = await seedUser();
            const user2 = await seedUser();
            await seedList(user1.id);
            await seedSharedList(user1.id, user2.id);

            const lists = await listService.getAllListOfUser({ userId: user1.id, res: {} as any });
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

        it("should throw Unauthorized error if there is no logged in user", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            await expect(listService.getListById({ userId: undefined, res: {} as any }, list.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw Unauthorized error if the user is not member of the list", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);
            await expect(listService.getListById({ userId: 2, res: {} as any }, list.id))
                .rejects
                .toThrow(UnauthorizedError);
        });

        it("should throw List not found error", async () => {
            const user = await seedUser();
            const list = await seedList(user.id);

            await expect(listService.getListById({ userId: user.id, res: {} as any }, 9999))
                .rejects
                .toThrow(NotFoundError)
        })
    })

    describe("addNewMemberToList", () => {
        it("user list count should increase after added to new list", async () => {
            const user1 = await seedUser();
            const user2 = await seedUser();
            const list1 = await seedList(user1.id);
            await seedList(user2.id);

            const listsBeforeAdd = await listService.getAllListOfUser({ userId: user2.id, res: {} as any });
            expect(listsBeforeAdd).toHaveLength(1);

            await listService.addNewMemberToList(
                { userId: user1.id, res: {} as any },
                user2.id,
                list1.id,
                ListRole.GUEST
            );

            const listsAfterAdd = await listService.getAllListOfUser({ userId: user2.id, res: {} as any });
            expect(listsAfterAdd).toHaveLength(2);
        });

        it("should add member with correct role", async () => {
            const owner = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);

            await listService.addNewMemberToList(
                { userId: owner.id, res: {} as any },
                newMember.id, list.id, ListRole.COLLABORATOR
            );

            const role = await listService.getUserRoleInList(newMember.id, list.id);
            expect(role).toBe(ListRole.COLLABORATOR);
        });

        it("should throw UnauthorizedError if context user is not authenticated", async () => {
            const owner = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);

            await expect(
                listService.addNewMemberToList(
                    { userId: undefined, res: {} as any },
                    newMember.id, list.id, ListRole.GUEST
                )
            ).rejects.toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError if context user is only a GUEST", async () => {
            const owner = await seedUser();
            const guest = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);

            await listService.addNewMemberToList(
                { userId: owner.id, res: {} as any },
                guest.id, list.id, ListRole.GUEST
            );

            await expect(
                listService.addNewMemberToList(
                    { userId: guest.id, res: {} as any },
                    newMember.id, list.id, ListRole.GUEST
                )
            ).rejects.toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError if context user is not a member of the list", async () => {
            const owner = await seedUser();
            const outsider = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);

            await expect(
                listService.addNewMemberToList(
                    { userId: outsider.id, res: {} as any },
                    newMember.id, list.id, ListRole.GUEST
                )
            ).rejects.toThrow(UnauthorizedError);
        });

        it("should throw Conflict error if user is already member of list", async () => {
            const owner = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);
            await listService.addNewMemberToList(
                { userId: owner.id, res: {} as any },
                newMember.id, list.id, ListRole.GUEST
            )

            await expect(
                listService.addNewMemberToList(
                    { userId: owner.id, res: {} as any },
                    newMember.id, list.id, ListRole.GUEST
                )
            ).rejects.toThrow(ConflictError);
        });

        it("should throw Conflict error if you try to add another owner", async () => {
            const owner = await seedUser();
            const newMember = await seedUser();
            const list = await seedList(owner.id);

            await expect(
                listService.addNewMemberToList(
                    { userId: owner.id, res: {} as any },
                    newMember.id, list.id, ListRole.OWNER
                )
            ).rejects.toThrow(ConflictError);
        });


    })

    describe("addNewList", () => {
        it("list should created successfully", async () => {
            const user = await seedUser()
            const list = await listService.addNewList({ userId: user.id, res: {} as any }, "New List", Category.Hobbies)
            expect(list.name).toBe("New List")
        });
    })
    describe("getListMembers", () => {
        it("it should return all members of the list", async () => {
            const user1 = await seedUser()
            const user2 = await seedUser()
            const list1 = await seedList(user1.id);

            await listService.addNewMemberToList({ userId: user1.id, res: {} as any }, user2.id, list1.id, ListRole.COLLABORATOR)
            const listUsers = listService.getListMembers({ userId: user1.id, res: {} as any }, list1.id)
            expect((await listUsers).length).toBe(2)
        });
        it("it should throw UnauthorizedError if requester is not member of the list", async () => {
            const user1 = await seedUser()
            const user2 = await seedUser()
            const list1 = await seedList(user1.id);

            await expect(listService.getListMembers({ userId: user2.id, res: {} as any }, list1.id)).rejects.toThrow(UnauthorizedError)
        });
    })

    describe("createInvitation", () => {
        it("it should return an invitation token", async () => {
            const user1 = await seedUser()
            const list1 = await seedList(user1.id);

            const token = await listService.createInvitation({ userId: user1.id, res: {} as any }, list1.id, ListRole.COLLABORATOR)
            expect(token).toBeTruthy();
        });
        it("it should throw UnauthorizedError if requester is only GUEST", async () => {
            const user1 = await seedUser()
            const user2 = await seedUser()
            const list1 = await seedList(user1.id);

            await listService.addNewMemberToList({ userId: user1.id, res: {} as any }, user2.id, list1.id, ListRole.GUEST)
            const token = await 

            await expect(listService.createInvitation({ userId: user2.id, res: {} as any }, list1.id, ListRole.COLLABORATOR)).rejects.toThrow(UnauthorizedError)
        });
    })

})