import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
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

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = jwt.sign(
      {
        userId: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Store jwt in cookie [cookie is a browser feature]
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // js cant access this cookie if true
      secure: process.env.NODE_ENV === "PROD", // if true cookie can only sent over https
      sameSite: "lax", // control cookie to send cross sites
      maxAge: 7 * 24 * 60 * 60 * 1000, // how long cookie lives
    });

    return res.status(200).json({
      status: 200,
      user: {
        name: newUser.name,
        email: newUser.email,
        token: accessToken,
      },
      message: "User registered sucessfully",
    });
  } catch (error) {
    console.log("Internal server error while registering", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while registering",
      error: error,
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

    const accessToken = jwt.sign(
      {
        userId: findUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PROD",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      token: accessToken,
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

export const logoutUserController = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PROD",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      message: "Logout successfull",
    });
  } catch (error) {
    console.log("Internal server error while logout", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error while logout",
      error,
    });
  }
};
