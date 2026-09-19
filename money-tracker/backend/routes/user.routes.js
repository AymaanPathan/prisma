import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  logoutUserController,
} from "../controller/user.controller.js";

const route = Router();
route.post("/register", registerUserController);
route.post("/login", loginUserController);
route.post("/logout", logoutUserController);

export default route;
