import musicDataBase from "../data/MusicDataBase";
import userDatabase from "../data/UserDatabase";
import { AuthenticatorData } from "../model/authenticatorInterface";
import { Music } from "../model/musicInterfaces";
import authenticator from "../services/Authenticator";
import { CustomError } from "./error/CustomError";
import { currentDate } from "./functions/currentDate";
import generateId from "../services/GenerateId";

export class CreateMusicBusiness {
  async execute(music: Music, token: string): Promise<void> {
    try {
      if (
        !music.title ||
        !music.genre ||
        !music.file ||
        !music.author ||
        !music.album
      ) {
        throw new CustomError(400, "Fields 'title', 'genre', 'file', 'date', 'author' and 'album' are required");
      }
      if(!token){
        throw new CustomError(401, "Not authorized");
      }

      const tokenData: AuthenticatorData = authenticator.getTokenData(token)
      const [idExist] = await userDatabase.getUserById(tokenData.id)
      if(!idExist){
        throw new CustomError(401, "Invalid Token");
      }

      const id: string = generateId.create()
      const dateNow: string = currentDate()
  
      const newMusic: Music = {
        id,
        title: music.title,
        genre: music.genre,
        file: music.file,
        author: music.author,
        album: music.album,
        date: dateNow
      }

      await musicDataBase.createMusic(newMusic)

    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new CreateMusicBusiness();
