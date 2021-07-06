import { Request, Response } from "express";
import getMusicByIdBusiness from "../business/GetMusicByIdBusiness";

export class GetMusicById {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id 
      const token: string = req.headers.authorization as string

      const result = await getMusicByIdBusiness.execute(id, token)

      res.send(result)
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || "Internal error" });
    }
  }
}

export default new GetMusicById();
