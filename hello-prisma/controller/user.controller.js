import prisma from "../db/db.config.js";

export const addUser = async (req, res) => {
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
