import { User } from '../model/userInterface'
import { BaseDatabase } from './BaseDatabase'

class UserDatabase extends BaseDatabase {
  private nameDatabase = 'user'

  async getUserByEmail(email: string): Promise<User[]>{
    const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE email = "${email}"
    `)

    return result
  }

  async getUserByNickname(nickname: string): Promise<User[]>{
    const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE nickname = "${nickname}"
    `)

    return result
  }

  async insertUser(user: User): Promise<void>{
    await this.connection.raw(`
      INSERT INTO ${this.nameDatabase}
      VALUES(
        "${user.id}",
        "${user.name}",
        "${user.nickname}",
        "${user.email}",
        "${user.password}"
      )
    `)
  }
}

export default new UserDatabase()