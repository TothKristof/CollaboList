import { ListRole } from "../generated/prisma";
import { prisma } from "../prismaClient";

async function createInvitation(listId: number, role: ListRole, userId: number) {
    return prisma.invitation.create({
        data: {
            listId,
            role,
            createdBy: userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
    });
}

export const invitationService = {
    createInvitation
};