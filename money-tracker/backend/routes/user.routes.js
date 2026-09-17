import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controller/user.controller.js";

const route = Router();
route.post("/register", registerUserController);
route.post("/login", loginUserController);

export default route;
