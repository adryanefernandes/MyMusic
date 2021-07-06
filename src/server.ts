import express from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import "express-async-errors";
import { musicRouter } from "./router/musicRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/music", musicRouter)

app.listen(3003, () => {
  console.log("Server is running in http://localhost:3003");
});
