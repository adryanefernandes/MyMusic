import { UserDatabase } from "../../src/data/UserDatabase";
import { User } from "../../src/model/userInterfaces";

export class UserDatabaseMockSignup extends UserDatabase {
  userMock: User = {
    id: '123',
    name: "test",
    nickname: "test123",
    email: "test@test.com",
    password: "correctPassword" 
  }

  async getUserByEmail(email: string): Promise<User[]> {
    return [this.userMock];
  }

  async getUserByNickname(nickname: string): Promise<User[]> {
    return [];
  }

  async insertUser(user: User): Promise<void> {}
}

export default new UserDatabaseMockSignup();
