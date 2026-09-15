import { Router } from "express";
import {
  createPostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
  updatePostController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
router.patch("/update/:postId", updatePostController);
export default router;
