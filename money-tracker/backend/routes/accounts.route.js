import { Router } from "express";
import {
  addAccountController,
  getUserAccounts,
  renameAccount,
  deleteAccount,
} from "../controller/account.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.get("/getUserAccounts/:userId", authenticateUser, getUserAccounts);
router.patch("/update", authenticateUser, renameAccount);
router.delete("/delete/:accountId", authenticateUser, deleteAccount);
router.post("/add", authenticateUser, addAccountController);

export default router;
