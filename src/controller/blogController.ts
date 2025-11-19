import { Request, Response } from "express";
import { blogService } from "../service/blogService";

export const blogController = {
    getAll: async (req: Request, res: Response) => {
    try {
      const blogs = await blogService.getAll();
      res.json(blogs);
    } catch {
      res.status(500).json({ error: "Bloglar yüklenemedi" });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const blog = await blogService.getById(String(req.params.id));
      if (!blog) return res.status(404).json({ error: "Blog bulunamadı" });
      res.json(blog);
    } catch {
      res.status(500).json({ error: "Blog getirilemedi" });
    }
  },
    create: async(req:any, res:Response) => {
        try {
            const{title, content}= req.body;
            if(!title || !content) return res.status(400).json({error:"eksik veri"});

            const newBlog = await blogService.create(title,content,req.kullanıcı.id);
            res.json(newBlog); 
        }
        catch(error){
          console.error("blog create  error",error);
            return res.status(500).json({error:"blog oluşturulamadı"})
        }
    },
update: async (req: any, res: Response) => {
    try {
        const id = req.params.id;
        const authorId = req.kullanıcı?.id;
        const { title, content } = req.body;

        console.log("Update isteği:", { id, authorId, title, content }); 
  
        if (!id) {
            return res.status(400).json({ error: "Blog ID gerekli" });
        }

        if (!authorId) {
            return res.status(401).json({ error: "Kullanıcı bilgisi bulunamadı" });
        }

        if (!title || !content) {
            return res.status(400).json({ error: "Başlık ve içerik gerekli" });
        }

        const blog = await blogService.getById(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog bulunamadı" });
        }

        if (blog.authorId !== authorId) {
            return res.status(403).json({ error: "Bu blog'u düzenleme yetkiniz yok" });
        }

        const updated = await blogService.update(id, title, content, authorId);
        res.json(updated);
        
    } catch (err: any) {
        console.error("Blog update hatası:", err);
        res.status(500).json({ error: "Blog güncellenemedi" });
    }
},
delete: async (req: any, res: Response) => {
    try {
        const id = req.params.id;
        const authorId = req.kullanıcı?.id; 

        console.log("Delete isteği:", { id, authorId }); 

        if (!id) {
            return res.status(400).json({ error: "Blog ID gerekli" });
        }

        if (!authorId) {
            return res.status(401).json({ error: "Kullanıcı bilgisi bulunamadı" });
        }

        const result = await blogService.delete(id, authorId);
        res.json(result);
        
    } catch (error: any) {
        console.error("Blog delete hatası:", error.message);
        
        if (error.message.includes("bulunamadı")) {
            return res.status(404).json({ error: error.message });
        }
        
        if (error.message.includes("yetkiniz yok") || error.message.includes("yetkisiz")) {
            return res.status(403).json({ error: error.message });
        }
        
        res.status(500).json({ error: "Blog silinemedi" });
    }
}
};
