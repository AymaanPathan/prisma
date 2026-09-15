import { Router } from "express";
import {
  addNewCommentController,
  deleteCommentController,
  getAllCommentsController,
  getCommentsOfPost,
  getCommentsWithUser,
  updateCommentController,
} from "../controller/comment.controller.js";

const router = Router();

router.get("/", getAllCommentsController);
router.get("/getPostCommnets", getCommentsOfPost);
router.get("/getuserComments", getCommentsWithUser);
router.post("/add", addNewCommentController);
router.patch("/update/:commentId", updateCommentController);
router.delete("/delete/:commentId", deleteCommentController);

export default router;
