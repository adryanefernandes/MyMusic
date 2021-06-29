import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { CustomError } from "./business/error/CustomError";
import { userRouter } from "./router/userRouter";
import "express-async-errors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);


app.listen(3003, () => {
  console.log("Server is running in http://localhost:3003");
});
