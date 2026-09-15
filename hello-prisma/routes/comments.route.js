import { Router } from "express";
import {
  addNewCommentController,
  getAllCommentsController,
} from "../controller/comment.controller.js";

const router = Router();

router.get("/", getAllCommentsController);
router.post("/add", addNewCommentController);

export default router;
