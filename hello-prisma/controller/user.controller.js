import { prisma } from "../lib/prisma.js";

export const addUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existedEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existedEmail) {
      return res.status(400).json({
        status: 400,
        message: "Email is already exist use different email",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.status(200).json({
      status: 200,
      addedUser: newUser,
      message: "User added successfully",
    });
  } catch (error) {
    return res.json({
      status: 400,
      message: "Internal server error while adding user",
    });
  }
};

// Update User
export const updateUserController = async (req, res) => {
  try {
    const userId = req.params.userId; // /id
    const { name, email, password } = req.body;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "user id is required to update the user",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "User updated Successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.log("Internal server error while updating user", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        status: 409,
        message: "Email already exists",
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Internal Server error while updating user",
      error,
    });
  }
};
