import { Router } from "express";
import {
  addAccountController,
  getAllAccountController,
  getUserAccounts,
  renameAccount,
} from "../controller/account.controller.js";

const router = Router();

router.get("/getUserAccounts/:userId", getUserAccounts);
router.patch("/update", renameAccount);
router.get("/getAll", getAllAccountController);
router.post("/add", addAccountController);

export default router;
