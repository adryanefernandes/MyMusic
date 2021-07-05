import musicDataBase, { MusicDataBase } from "../data/MusicDataBase";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import authenticator, { Authenticator } from "../services/Authenticator";
import generateId, { GenerateId } from "../services/GenerateId";
import { AuthenticatorData } from "../model/authenticatorInterface";
import { Answer, Music } from "../model/musicInterfaces";
import { CustomError } from "./error/CustomError";
import { currentDate } from "./functions/currentDate";

export class CreateMusicBusiness {
  constructor(
    private authenticator: Authenticator,
    private userDatabase: UserDatabase,
    private generateId: GenerateId,
    private musicDataBase: MusicDataBase
  ) {}

  async execute(music: Music, token: string): Promise<Answer> {
    try {
      if (
        !music.title ||
        !music.genre ||
        !music.file ||
        !music.author ||
        !music.album
      ) {
        throw new CustomError(
          400,
          "Fields 'title', 'genre', 'file', 'date', 'author' and 'album' are required"
        );
      }
      if (!token) {
        throw new CustomError(401, "Not authorized");
      }

      const tokenData: AuthenticatorData =
        this.authenticator.getTokenData(token);
      const [idExist] = await this.userDatabase.getUserById(tokenData.id);
      if (!idExist) {
        throw new CustomError(401, "Invalid Token");
      }

      const id: string = this.generateId.create();
      const dateNow: string = currentDate();

      const newMusic: Music = {
        id,
        title: music.title,
        genre: music.genre,
        file: music.file,
        author: music.author,
        album: music.album,
        date: dateNow,
      };

      await this.musicDataBase.createMusic(newMusic);

      const message: Answer = {
        message: "Created!"
      }

      return message
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new CreateMusicBusiness(
  authenticator,
  userDatabase,
  generateId,
  musicDataBase
);
