import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiGateway from "./routes/index";

dotenv.config();
const PORT = process.env.PORT || 5004;
export const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api", apiGateway);


app.get('/', (req, res) => {
    res.json({ message: 'api çalışıyor!' });
});
