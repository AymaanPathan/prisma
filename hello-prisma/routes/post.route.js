import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
  updatePostController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
router.patch("/update/:postId", updatePostController);
router.delete("/delete/:postId", deletePostController);
export default router;
