import { GetMusicsBusiness } from "../../src/business/GetMusicsBusiness";
import authenticatorMock from "../mock/AuthenticatorMock";
import userDatabaseMockResults from "../mock/UserDatabaseMockResults";
import musicDatabaseMock from "../mock/MusicDatabaseMock";

describe("endpoint of getting music", () => {
  test("Error: token not passed", async () => {
    expect.assertions(1);

    try {
      const getMusicsBusiness = new GetMusicsBusiness(
        authenticatorMock,
        userDatabaseMockResults,
        musicDatabaseMock
      );
      
      const token = ""
      await getMusicsBusiness.execute(token)

    } catch (error) {
      expect(error.message).toBe("Not authorized")
    }
  });

  test("Sucess", async () => {

      const getMusicsBusiness = new GetMusicsBusiness(
        authenticatorMock,
        userDatabaseMockResults,
        musicDatabaseMock
      );
      
      const token = "token"
      const result = await getMusicsBusiness.execute(token)

      expect(result[0]).toEqual({
        id: "1",
        title: "test",
        album: "test",
        author: "Ana test",
        file: "link",
        genre: ["rock"],
        date: "2021-05-23"
      })
  })
});
