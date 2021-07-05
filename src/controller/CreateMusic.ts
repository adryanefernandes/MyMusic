import { Request, Response } from "express";
import createMusicBusiness from "../business/CreateMusicBusiness";
import { Music } from "../model/musicInterfaces";

export class CreateMusic {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const newMusic: Music = {
        title: req.body.title,
        author: req.body.author,
        file: req.body.file,
        genre: req.body.genre,
        album: req.body.album,
      };

      const token = req.headers.authorization as string;

      const answer = await createMusicBusiness.execute(newMusic, token);

      res.send(answer);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || "internal Error" });
    }
  }
}

export default new CreateMusic();
