import { Request, Response } from "express";
import signupBusiness from "../business/signupBusiness";
import { User } from "../model/userInterface";

export class Signup {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const user: User = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
      };

      const token = await signupBusiness.execute(user);

      res.send({ token });
    } catch (error) {
      res.status(error.statusCode).send({ message: error.message });
    }
  }
}

export default new Signup();
