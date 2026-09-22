import { Router } from "express";
import { transferFundsController } from "../controller/transaction.controller.js";
import { authenticateUser } from "../middleware/auth.js";
const router = Router();

router.post("/transfer", authenticateUser, transferFundsController);

export default router;
