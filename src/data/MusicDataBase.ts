import { CustomError } from "../business/error/CustomError";
import { Music } from "../model/musicInterfaces";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDataBase extends BaseDatabase {
  private tableName = "musics";

  async createMusic(music: Music): Promise<void> {
    try {
      await this.connection.raw(`
      INSERT INTO ${this.tableName}
      VALUES(
        "${music.id}",
        "${music.title}",
        "${music.author}",
        "${music.date}",
        "${music.file}",
        "${music.genre}",
        "${music.album}"
      )
    `);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getMusics(): Promise<Music[]> {
    try {
      const [result] = await this.connection.raw(`
      SELECT * FROM ${this.tableName}
    `);

      return result;
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getById(id: string): Promise<Music> {
    try {
      const [result] = await this.connection.raw(`
      SELECT * FROM ${this.tableName}
      WHERE id = "${id}"
    `);

      return result[0];
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new MusicDataBase();
