import { Router } from "express";
import userRoutes from "./user.routes.js";
import postRouter from "./post.route.js";

export const routes = Router();

routes.use("/api/user", userRoutes);
routes.use("/api/post", postRouter);
