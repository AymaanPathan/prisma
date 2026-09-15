import { Router } from "express";
import {
  addNewCommentController,
  getAllCommentsController,
  getCommentsOfPost,
} from "../controller/comment.controller.js";

const router = Router();

router.get("/", getAllCommentsController);
router.get("/getPostCommnets", getCommentsOfPost);
router.post("/add", addNewCommentController);

export default router;
