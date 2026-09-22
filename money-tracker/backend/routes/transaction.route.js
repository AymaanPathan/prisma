import { Router } from "express";
import { transferFundsController } from "../controller/transaction.controller";
const router = Router();

router.post("/transfer", transferFundsController);

export default router;
