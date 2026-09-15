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
    return res.status(201).json({
      status: 201,
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

// get only comments of all post
export const getCommentsOfPost = async (req, res) => {
  try {
    const commentsOfPost = await prisma.comment.findMany({
      select: {
        comment: true,
        post: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    if (commentsOfPost.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Not a single comment found",
      });
    }

    return res.status(200).json({
      status: 200,
      comments: commentsOfPost,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log("internal server error while getting comment", error);
    res.status(500).json({
      status: 500,
      error,
      message: "Internal server error while getting comment",
    });
  }
};

// get users with its post and comments
export const getCommentsWithUser = async (req, res) => {
  try {
    const commentsOfPost = await prisma.comment.findMany({
      select: {
        comment: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (commentsOfPost.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Not a single comment found",
      });
    }

    return res.status(200).json({
      status: 200,
      comments: commentsOfPost,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log("internal server error while getting comment", error);
    res.status(500).json({
      status: 500,
      error,
      message: "Internal server error while getting comment",
    });
  }
};

// update comment
export const updateCommentController = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { comment } = req.body;
    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        comment: comment,
      },
    });

    return res.status(200).json({
      status: 200,
      updatedComment: updatedComment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.log("internal server error while updating comment", error);
    res.status(500).json({
      status: 500,
      error,
      message: "Internal server error while updating comment",
    });
  }
};

// delete comment
export const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });

    return res.status(200).json({
      status: 200,
      deletedComment: deletedComment,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log("internal server error while deleting comment", error);
    res.status(500).json({
      status: 500,
      error,
      message: "Internal server error while deleting comment",
    });
  }
};
