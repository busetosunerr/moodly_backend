import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function findUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}
export async function findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}

export async function createUser(
    username: string,
    password: string,
    email: string

) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email
        },
    });
}

