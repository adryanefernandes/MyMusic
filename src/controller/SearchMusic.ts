import { Request, Response } from "express";
import searchMusicBusiness from "../business/SearchMusicBusiness";

export class SearchMusic {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const search: string = req.query.search as string;

      const result = await searchMusicBusiness.execute(search);

      res.send(result);
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}

export default new SearchMusic();
