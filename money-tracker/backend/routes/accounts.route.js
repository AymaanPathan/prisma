import { Router } from "express";
import {
  addAccountController,
  getAllAccountController,
  getUserAccounts,
  renameAccount,
  deleteAccount,
} from "../controller/account.controller.js";

const router = Router();

router.get("/getUserAccounts/:userId", getUserAccounts);
router.patch("/update", renameAccount);
router.delete("/delete/:accountId", deleteAccount);
router.get("/getAll", getAllAccountController);
router.post("/add", addAccountController);

export default router;
