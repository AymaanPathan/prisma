import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

// register user
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Name is required to register",
      });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Email is required to register",
      });
    }

    if (!password || password.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Password is required to register",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const existedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exist with this email",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      status: 200,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      message: "User registered sucessfully",
    });
  } catch (error) {
    console.log("Internal server error while registering", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while registering",
    });
  }
};
