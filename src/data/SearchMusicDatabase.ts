import { Music } from "../model/musicInterfaces";
import { BaseDatabase } from "./BaseDatabase";

export class SearchDatabase extends BaseDatabase {
  private tableName: string = "musics";

  async getResult(search: string): Promise<Music[]> {
    const [result] = await this.connection.raw(`
      SELECT * FROM ${this.tableName}
      WHERE LOWER(title) LIKE "%${search}%" 
      OR LOWER(author) LIKE "%${search}%" 
      OR LOWER(album) LIKE "%${search}%"
      OR LOWER(genre) LIKE "%${search}%";
    `);

    return result;
  }
}

export default new SearchDatabase();
