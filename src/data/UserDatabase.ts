import { User } from '../model/userInterfaces'
import { BaseDatabase } from './BaseDatabase'

export class UserDatabase extends BaseDatabase {
  private nameDatabase = 'users'

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

  async getUserById(id: string): Promise<User[]>{
    const [result] = await this.connection.raw(`
      SELECT * FROM ${this.nameDatabase}
      WHERE id = "${id}"
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