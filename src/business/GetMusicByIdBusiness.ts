import musicDataBase, { MusicDataBase } from "../data/MusicDataBase";
import { Music } from "../model/musicInterfaces";
import { CustomError } from "./error/CustomError";

export class GetMusicByIdBusiness {
  constructor(
    private musicDataBase: MusicDataBase
  ){}

  async execute(id: string, token: string): Promise<Music>{
    try {
      if(!id){
        throw new CustomError(400, "Fields 'id' are required");
      }
      if(!token){
        throw new CustomError(401, "Not authorized");
      }

      const result: Music = await this.musicDataBase.getById(id)

      return result
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new GetMusicByIdBusiness(musicDataBase);
