import userDatabase from "../data/UserDatabase";
import { User } from "../model/userInterface";
import authenticator from "../services/Authenticator";
import generateId from "../services/generateId";
import hashManager from "../services/HashManager";
import { CustomError } from "./error/CustomError";
import feildIsValid from "./validations/FeildIsValid";

export class SignupBusiness {
  async execute(user: User): Promise<string> {
    try {
      //Validações
      if (!user.name || !user.email || !user.nickname || !user.password) {
        throw new CustomError(
          400,
          "Fields 'name', 'email, 'nickname' and 'password' are required"
        );
      }

      feildIsValid.emailIsValid(user.email);

      const userByEmail = await userDatabase.getUserByEmail(user.email);
      if (userByEmail.length > 0) {
        throw new CustomError(409, "Email already exists");
      }

      const userByNickname = await userDatabase.getUserByNickname(
        user.nickname
      );
      if (userByNickname.length > 0) {
        throw new CustomError(409, "User already exists");
      }

      if (user.password.length < 6) {
        throw new CustomError(400, "Password must be at least 6 characters");
      }

      //Criando dados que faltam
      const id = generateId.create();

      const hashPassword = hashManager.createHash(user.password);

      const userData: User = {
        ...user,
        id,
        password: hashPassword,
      };

      await userDatabase.insertUser(userData);

      const token = authenticator.generateToken({ id });

      return token;

    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new SignupBusiness();
