import { Request, Response } from "express";
import getMusicsBusiness from "../business/GetMusicsBusiness";

export class GetMusics {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const token: string = req.headers.authorization as string

      const result = await getMusicsBusiness.execute(token)

      res.send(result)
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}

export default new GetMusics()