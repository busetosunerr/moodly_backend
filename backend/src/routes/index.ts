import { Router } from "express";
import authRoutes from "../routes/authRoutes";
import notificationRoutes from "../routes/notification.route";
import { authenticate } from "../modules/auth/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/notification", authenticate, notificationRoutes);

export default router;
