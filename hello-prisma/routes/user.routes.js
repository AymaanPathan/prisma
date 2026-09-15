import { Router } from "express";
import {
  addUserController,
  updateUserController,
} from "../controller/user.controller.js";

const router = Router();

router.post("/add", addUserController);
router.patch("/update/:userId", updateUserController);

export default router;
