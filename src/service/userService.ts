import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function findUserByUsername(username: string) {
    return prisma.kullanıcı.findUnique({ where: { username } });
}

export async function findUserByEmail(email: string) {
    return prisma.kullanıcı.findUnique({ where: { email } });
}

export async function createUser(
    username: string,
    password: string,
    email: string

) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return prisma.kullanıcı.create({
        data: {
            username,
            password: hashedPassword,
            email

        },
    });
}

