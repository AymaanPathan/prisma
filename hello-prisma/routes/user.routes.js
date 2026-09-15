import { Router } from "express";
import {
  addUserController,
  getUserByIdController,
  getAllUserController,
  updateUserController,
} from "../controller/user.controller.js";

const router = Router();

router.post("/add", addUserController);
router.get("/", getAllUserController);
router.patch("/update/:userId", updateUserController);
router.get("/:id", getUserByIdController);

export default router;
