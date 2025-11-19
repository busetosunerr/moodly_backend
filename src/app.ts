import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
dotenv.config();
const PORT = process.env.PORT || 5004;
const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api',blogRoutes);
app.use('/api', authRoutes);



const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.json({ message: 'api çalışıyor!' });
});
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});