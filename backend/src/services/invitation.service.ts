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

async function findInvitationByToken(token: string) {
    const invitation = await prisma.invitation.findUnique({
        where: { token }
    });

    if (!invitation) throw new Error('Invalid token');
    if (invitation.expiresAt < new Date()) throw new Error('Expired');
    if (invitation.maxUses !== null && invitation.useCount >= invitation.maxUses) {
        throw new Error('Link expired');
    }

    return invitation;
}



export const invitationService = {
    createInvitation,
    findInvitationByToken
};