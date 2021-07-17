import { CustomError } from "../business/error/CustomError";
import { User } from "../model/userInterfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private nameDatabase = "users";

  async getUserByEmail(email: string): Promise<User[]> {
    try {
      const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE email = "${email}"
    `);

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getUserByNickname(nickname: string): Promise<User[]> {
    try {
      const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE nickname = "${nickname}"
    `);

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getUserById(id: string): Promise<User[]> {
    try {
      const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE id = "${id}"
    `);

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async insertUser(user: User): Promise<void> {
    try {
      await this.connection.raw(`
      INSERT INTO ${this.nameDatabase}
      VALUES(
        "${user.id}",
        "${user.name}",
        "${user.nickname}",
        "${user.email}",
        "${user.password}"
      )
    `);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new UserDatabase();
