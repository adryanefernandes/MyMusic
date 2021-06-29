import userDatabase, { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/userInterface";
import authenticator, { Authenticator } from "../services/Authenticator";
import generateId, { GenerateId } from "../services/generateId";
import hashManager, { HashManager } from "../services/HashManager";
import { CustomError } from "./error/CustomError";
import feildIsValid from "./validations/FeildIsValid";

export class SignupBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private generateId: GenerateId,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) {}

  async execute(user: User): Promise<string> {
    try {
      //Validations
      if (!user.name || !user.email || !user.nickname || !user.password) {
        throw new CustomError(
          400,
          "Fields 'name', 'email, 'nickname' and 'password' are required"
        );
      }

      feildIsValid.emailIsValid(user.email);

      const searchUserByEmail = await this.userDatabase.getUserByEmail(user.email);
      if (searchUserByEmail.length === 1) {
        throw new CustomError(409, "Email already exists");
      }

      const searchUserByNickname = await this.userDatabase.getUserByNickname(
        user.nickname
      );
      if (searchUserByNickname.length === 1) {
        throw new CustomError(409, "User already exists");
      }

      if (user.password.length < 6) {
        throw new CustomError(400, "Password must be at least 6 characters");
      }
      
      // -- //
      const id = this.generateId.create();

      const hashPassword = this.hashManager.createHash(user.password);

      const userData: User = {
        ...user,
        id,
        password: hashPassword,
      };

      await this.userDatabase.insertUser(userData);

      const token = this.authenticator.generateToken({ id });

      return token;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new SignupBusiness(
  userDatabase,
  generateId,
  hashManager,
  authenticator
);
