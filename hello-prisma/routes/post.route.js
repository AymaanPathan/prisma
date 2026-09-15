import { Router } from "express";
import {
  createPostController,
  getAllPostWithitsUserController,
  getPostwithUserNameController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
router.get("/:postId", getPostwithUserNameController);
export default router;
