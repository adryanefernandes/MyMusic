import musicDataBase, { MusicDataBase } from "../data/MusicDataBase";
import userDatabase, { UserDatabase } from "../data/UserDatabase";
import authenticator, { Authenticator } from "../services/Authenticator";
import { AuthenticatorData } from "../model/authenticatorInterface";
import { CustomError } from "./error/CustomError";
import { Music } from "../model/musicInterfaces";

export class GetMusicsBusiness {
  constructor(
    private authenticator: Authenticator,
    private userDatabase: UserDatabase,
    private musicDataBase: MusicDataBase
  ) {}

  async execute(token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Not authorized");
      }

      const tokenData: AuthenticatorData =
        this.authenticator.getTokenData(token);
      const [idExist] = await this.userDatabase.getUserById(tokenData.id);
      if (!idExist) {
        throw new CustomError(401, "Invalid Token");
      }

      const result: Music[] = await this.musicDataBase.getMusics();

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new GetMusicsBusiness(
  authenticator,
  userDatabase,
  musicDataBase
);
