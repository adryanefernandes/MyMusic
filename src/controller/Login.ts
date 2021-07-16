import { Request, Response } from "express";
import loginBusiness from "../business/LoginBusiness";
import { UserLogin } from "../model/userInterfaces";

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
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}

export default new Login();
