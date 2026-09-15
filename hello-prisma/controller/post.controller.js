import { prisma } from "../lib/prisma.js";

// Create Post
export const createPostController = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;

    if (title.trim() === "" || description.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Valid title and description required ",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        user_id: Number(user_id),
      },
    });

    return res.status(200).json({
      status: 200,
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
        user: true,
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
