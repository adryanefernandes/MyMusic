import { UserDatabase } from "../../src/data/UserDatabase";
import { User } from "../../src/model/userInterfaces";

export class UserDatabaseMockSignup extends UserDatabase {
  async getUserByEmail(email: string): Promise<User[]> {
    return [];
  }

  async getUserByNickname(nickname: string): Promise<User[]> {
    return [];
  }

  async insertUser(user: User): Promise<void> {}
}

export default new UserDatabaseMockSignup();
