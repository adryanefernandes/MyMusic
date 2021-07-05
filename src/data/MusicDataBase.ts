import { Music } from "../model/musicInterfaces";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDataBase extends BaseDatabase {
  private tableName = "musics";

  async createMusic(music: Music): Promise<void> {
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
  }
}

export default new MusicDataBase();
