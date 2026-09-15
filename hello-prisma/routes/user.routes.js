import { Router } from "express";
import {
  addUserController,
  getUserByIdController,
  getAllUserController,
  updateUserController,
  deleteUserController,
} from "../controller/user.controller.js";

const router = Router();

router.post("/add", addUserController);
router.get("/", getAllUserController);
router.patch("/update/:userId", updateUserController);
router.delete("/delete/:id", deleteUserController);
router.get("/:id", getUserByIdController);

export default router;
