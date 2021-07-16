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
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}

export default new GetMusicById();
