import { Router } from "express";
import { registerUserController } from "../controller/user.controller";

const route = Router();
route.post("/register", registerUserController);

export default route;
