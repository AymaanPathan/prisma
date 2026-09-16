import { prisma } from "../lib/prisma.js";

// Create Post
export const createPostController = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    if (
      !title ||
      !description ||
      title.trim() === "" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        status: 400,
        message: "Valid title and description required",
      });
    }

    const userId = Number(user_id);

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        status: 400,
        message: "Valid user_id required",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        user_id: userId,
      },
    });

    return res.status(201).json({
      status: 201,
      data: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while creating post",
    });
  }
};

// Get all Post with its user
export const getAllPostWithitsUserController = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    if (allPosts.length === 0) {
      return res.status(404).json({
        status: 404,
        data: [],
        message: "Post not found ",
      });
    }

    return res.status(200).json({
      status: 200,
      data: allPosts,
      message: "Post fetched successfully",
    });
  } catch (error) {
    console.log("Internal server error while getting post with its user");
    return res.status(500).json({
      status: 500,
      message: "Internal server error while getting post with its user",
    });
  }
};

// get single post with id and its user name only
export const getPostwithUserNameController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        id: true,
        title: true,
        description: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: 200,
      post: post,
      message: "Post fetched sucessfully",
    });
  } catch (error) {
    console.log(
      "Internal server error while getting post with its userName",
      error,
    );
    return res.status(500).json({
      status: 500,
      message: "Internal server error while getting post with its userName",
    });
  }
};

// Update post
export const updatePostController = async (req, res) => {
  const { title, description } = req.body;
  try {
    const postId = req.params.postId;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: title,
        description: description,
      },
    });

    return res.status(200).json({
      status: 200,
      updatedPost: updatePost,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.log("Internal server error while updating post", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while updating post",
    });
  }
};

// Delete post
export const deletePostController = async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    return res.status(200).json({
      status: 200,
      updatedPost: deletePost,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log("Internal server error while deleting post", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while deleting post",
    });
  }
};

// Get post with user name and its comment count
export const getPostDetailController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        id: true,
        title: true,
        description: true,
        comment_count: true,
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            comment: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "No post found",
      });
    }

    return res.status(200).json({
      status: 200,
      post,
      message: "Post fetched successfully",
    });
  } catch (error) {
    console.log("Internal server error while getting  post details", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while getting  post details",
    });
  }
};

// Get post where its desc start with hello
export const getPostHelloController = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      where: {
        description: {
          startsWith: "hello",
        },
      },
    });
    if (post.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No post found that starts with hello",
      });
    }
    return res.status(200).json({
      status: 200,
      post,
      message: "Post fetched successfully",
    });
  } catch (error) {
    console.log("Internal server error while getting  post Hello", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while getting  post Hello",
    });
  }
};
