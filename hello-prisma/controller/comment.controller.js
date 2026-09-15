import { prisma } from "../lib/prisma.js";
// get all comments
export const getAllCommentsController = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({});
    if (comments.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Not a single comment found",
      });
    }
    res.status(200).json({
      status: 200,
      comments,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log("Internal server error while getting comments", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while getting comments",
    });
  }
};

// add new comment

export const addNewCommentController = async (req, res) => {
  try {
    const { post_id, user_id, comment } = req.body;
    if (!post_id || !user_id || !comment) {
      return res.status(400).json({
        status: 400,
        message: "Post_id | user_id | comment is required to add comment",
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        post_id,
        user_id,
        comment,
      },
    });
    return res.status(200).json({
      status: 200,
      comment: newComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log("internal server error while adding comment", error);
    res.status(500).json({
      status: 500,
      error,
      message: "Internal server error while adding comment",
    });
  }
};

// get post of all comments


// get users with its post and comments
// update comment
// delete comment
