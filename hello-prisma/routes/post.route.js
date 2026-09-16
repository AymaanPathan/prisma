import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
  updatePostController,
  getPostDetailController,
  getPostHelloController,
  getPostMoreThenEaqual3CommentsController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
router.patch("/update/:postId", updatePostController);
router.delete("/delete/:postId", deletePostController);
router.get("/details/:postId", getPostDetailController);
router.get("/get/hello", getPostHelloController);
router.get("/get/withComments", getPostMoreThenEaqual3CommentsController);

export default router;
