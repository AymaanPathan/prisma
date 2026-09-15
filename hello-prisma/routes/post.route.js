import { Router } from "express";
import { createPostController } from "../controller/post.controller.js";

const router = Router();

router.post("/add", createPostController);

export default router