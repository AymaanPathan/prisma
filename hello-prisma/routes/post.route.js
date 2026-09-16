import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
  updatePostController,
  getPostDetailController,
  getPostHelloController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
router.patch("/update/:postId", updatePostController);
router.delete("/delete/:postId", deletePostController);
router.get("/details/:postId", getPostDetailController);
router.get("/get/hello", getPostHelloController);

export default router;
