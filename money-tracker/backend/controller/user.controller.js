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

// Login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "Email is required to login user",
      });
    }

    if (!password || password.trim() === "") {
      return res.status(400).json({
        status: 400,
        message: "password is required to login user",
      });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        status: 404,
        message: "No user found with this email",
      });
    }

    const isPassValid = await bcrypt.compare(password, findUser.password);

    if (!isPassValid) {
      return res.status(401).json({
        status: 401,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Login sucessfull",
    });
  } catch (error) {
    console.log("Internal server error while Login user", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while Login user",
    });
  }
};
