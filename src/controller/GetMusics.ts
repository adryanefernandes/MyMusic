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
        .status(error.statusCode || 500)
        .send({ message: error.message || "Internal error" });
    }
  }
}

export default new GetMusics()