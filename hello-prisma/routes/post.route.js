import { Router } from "express";
import {
  createPostController,
  getAllPostWithitsUserController,
} from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);
router.get("/", getAllPostWithitsUserController);
export default router;
