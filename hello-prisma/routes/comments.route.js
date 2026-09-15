import { Router } from "express";
import {
  addNewCommentController,
  getAllCommentsController,
  getCommentsOfPost,
  getCommentsWithUser,
} from "../controller/comment.controller.js";

const router = Router();

router.get("/", getAllCommentsController);
router.get("/getPostCommnets", getCommentsOfPost);
router.get("/getuserComments", getCommentsWithUser);
router.post("/add", addNewCommentController);

export default router;
