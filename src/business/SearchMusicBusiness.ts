import searchMusicDatabase from "../data/SearchMusicDatabase";
import { Music } from "../model/musicInterfaces";
import { CustomError } from "./error/CustomError";

export class SearchMusicBusiness {
  async execute(search: string) {
    try {
      if (!search) {
        throw new CustomError(404, "Empty search field");
      }

      const result: Music[] = await searchMusicDatabase.getResult(search.toLowerCase());
      if(!result){
        throw new CustomError(404, "No results");
      }

      return result
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}

export default new SearchMusicBusiness();
