import userDatabase, { UserDatabase } from "../data/UserDatabase";
import authenticator, { Authenticator } from "../services/Authenticator";
import hashManager, { HashManager } from "../services/HashManager";
import { CustomError } from "./error/CustomError";
import { AuthenticatorData } from "../model/authenticatorInterface";
import { UserLogin } from "../model/userInterfaces";

export class LoginBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ){}

  async execute(user: UserLogin): Promise<string> {
    try {
      if (!user.email || !user.password) {
        throw new CustomError(
          400,
          "Fields 'name' and 'password' are required"
        );
      }

      const [userData] = await this.userDatabase.getUserByEmail(user.email);

      const passwordIsCorrect = this.hashManager.compareHash(
        user.password,
        userData.password
      );
      if (!passwordIsCorrect) {
        throw new CustomError(401, "Incorrect password");
      }

      const generateTokenData: AuthenticatorData = { id: userData.id as string }
      const token = this.authenticator.generateToken(generateTokenData);

      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new LoginBusiness(userDatabase, hashManager, authenticator);
