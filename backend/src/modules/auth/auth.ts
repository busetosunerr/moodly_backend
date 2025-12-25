import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
    username: string;
    id:string;

}
export const authenticate = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
        req.user= decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "invalid token" });
    }
};
