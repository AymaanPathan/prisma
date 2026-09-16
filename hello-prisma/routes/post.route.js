import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
  updatePostController,
  getPostDetail,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
router.patch("/update/:postId", updatePostController);
router.delete("/delete/:postId", deletePostController);
router.get("/details/:postId", getPostDetail);

export default router;
