import jwt from "jsonwebtoken";
// Check if user is logged in or not

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Invalid or token expired",
    });
  }
};
