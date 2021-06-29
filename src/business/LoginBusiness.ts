import userDatabase from "../data/UserDatabase";
import { AuthenticatorData } from "../model/authenticatorInterface";
import { UserLogin } from "../model/userInterface";
import authenticator from "../services/Authenticator";
import hashManager from "../services/HashManager";
import { CustomError } from "./error/CustomError";

export class LoginBusiness {
  async execute(user: UserLogin): Promise<string> {
    try {
      if (!user.email || !user.password) {
        throw new CustomError(
          400,
          "Fields 'name', 'email, 'nickname' and 'password' are required"
        );
      }

      const [userData] = await userDatabase.getUserByEmail(user.email);

      const passwordIsCorrect = hashManager.compareHash(
        user.password,
        userData.password
      );
      if (!passwordIsCorrect) {
        throw new CustomError(401, "Incorrect password");
      }

      const generateTokenData: AuthenticatorData = { id: userData.id as string }
      const token = authenticator.generateToken(generateTokenData);

      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new LoginBusiness();
