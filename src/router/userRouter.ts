import { Router } from "express";
import signup from "../controller/signup";

export const userRouter = Router();

userRouter.post("/signup", signup.handle)
