import musicDataBase from "../data/MusicDataBase";
import userDatabase from "../data/UserDatabase";
import { AuthenticatorData } from "../model/authenticatorInterface";
import authenticator from "../services/Authenticator";
import { CustomError } from "./error/CustomError";

export class GetMusicsBusiness {
  async execute(token: string) {
    try {
      if (!token) {
        throw new CustomError(401, "Not authorized");
      }

      const tokenData: AuthenticatorData = authenticator.getTokenData(token);
      const [idExist] = await userDatabase.getUserById(tokenData.id);
      if (!idExist) {
        throw new CustomError(401, "Invalid Token");
      }

      const result = await musicDataBase.getMusics()
      if(result.length === 0){
        throw new CustomError(404, "No results");
      }

      return result
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new GetMusicsBusiness();
