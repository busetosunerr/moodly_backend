import { Router, Request, Response } from "express";
import { sendReminder } from "../modules/notification/notificationService";

const router = Router();

router.post("/reminder", async (req: Request, res: Response) => {
  await sendReminder();
  res.status(200).json({
    message: "Reminder notification triggered (design phase)",
  });
});

export default router;
