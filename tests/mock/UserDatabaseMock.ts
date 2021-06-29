import { Knex } from "knex";
import { UserDatabase } from "../../src/data/UserDatabase";
import { User } from "../../src/model/userInterface";

export class UserDatabaseMock extends UserDatabase {
  async getUserByEmail(email: string): Promise<User[]> {
    return [];
  }

  async getUserByNickname(nickname: string): Promise<User[]> {
    return [];
  }

  async insertUser(user: User): Promise<void> {}
}

export default new UserDatabaseMock();
