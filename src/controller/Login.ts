import { Request, Response } from "express";

export class Login {
  async handle(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || "internal Error" });
    }
  }
}

export default new Login();
