import { Router } from "express";
import login from "../controller/Login";
import signup from "../controller/Signup";

export const userRouter = Router();

userRouter.post("/signup", signup.handle)
userRouter.post("/login", login.handle)
