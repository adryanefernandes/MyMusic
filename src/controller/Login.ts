import { Request, Response } from "express";
import loginBusiness from "../business/LoginBusiness";
import { UserLogin } from "../model/userInterface";

export class Login {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const user: UserLogin = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await loginBusiness.execute(user);

      res.send({ token });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || "internal Error" });
    }
  }
}

export default new Login();
