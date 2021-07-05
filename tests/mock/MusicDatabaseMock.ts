import { BaseDatabase } from "../../src/data/BaseDatabase";
import { Music } from "../../src/model/musicInterfaces";

export class MusicDataBaseMock {
  private tableName = "musics";

  async createMusic(music: Music): Promise<void> {
  }
}

export default new MusicDataBaseMock();