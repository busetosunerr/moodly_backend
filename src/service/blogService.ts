import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
 export const blogService = {
    getAll: async () => {
    return prisma.blog.findMany({
      include: { author: { select: { id: true, username: true, email: true } } },
    });
  },

  getById: async (id: string) => {
    return prisma.blog.findUnique({
      where: {id},
      include: { author: { select: { id: true, username: true, email: true } } },
    });
  },
    create: async(title:string, content:string, authorId:string) => {
        return prisma.blog.create({
            data : {title, content , authorId},
        });
    },
   update: async (id: string, title: string, content: string, authorId: string) => {
    return prisma.blog.update({
        where: { id },
        data: { title, content },
        include: { author: { select: { id: true, username: true, email: true } } }
    });

    },
    delete: async (id: string, authorId: string) => {
    const blog = await prisma.blog.findUnique({
        where: { id },
        select: { id: true, authorId: true }
    });

    if (!blog) {
        throw new Error("Blog bulunamadı");
    }

    if (blog.authorId !== authorId) {
        throw new Error("Bu blog'u silme yetkiniz yok");
    }
    await prisma.blog.delete({
        where: { id }
    });

    return { message: "Blog başarıyla silindi" };
},

 };


