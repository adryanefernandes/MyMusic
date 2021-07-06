import { GetMusicByIdBusiness } from "../../src/business/GetMusicByIdBusiness";
import musicDataBaseMock from "../mock/MusicDatabaseMock";

describe("Endpoint of getting music by id", () => {
  test("Error: id not last", async () => {
    expect.assertions(1);

    try {
      const getMusicByIdBusiness = await new GetMusicByIdBusiness(
        musicDataBaseMock
      );

      const id = "";
      const token = "token";
      await getMusicByIdBusiness.execute(id, token);
    } catch (error) {
      expect(error.message).toBe("Fields 'id' are required");
    }
  });

  test("Error: token not last", async () => {
    expect.assertions(1);

    try {
      const getMusicByIdBusiness = await new GetMusicByIdBusiness(
        musicDataBaseMock
      );

      const id = "123";
      const token = "";
      await getMusicByIdBusiness.execute(id, token);
    } catch (error) {
      expect(error.message).toBe("Not authorized");
    }
  });

  test("Sucess", async () => {
    const getMusicByIdBusiness = await new GetMusicByIdBusiness(
      musicDataBaseMock
    );

    const id = "1";
    const token = "token";
    
    const result = await getMusicByIdBusiness.execute(id, token);
    
    expect(result).toEqual({
      id: "1",
      title: "test",
      album: "test",
      author: "Ana test",
      file: "link",
      genre: ["rock"],
      date: "2021-05-23"
    })
  });
});
