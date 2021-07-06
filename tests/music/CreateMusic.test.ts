import { CreateMusicBusiness } from "../../src/business/CreateMusicBusiness";
import authenticatorMock from "../mock/AuthenticatorMock";
import userDataBaseMock from "../mock/UserDatabaseMockResults";
import generateIdMock from "../mock/GenerateIdMock";
import { Music } from "../../src/model/musicInterfaces";
import musicDatabaseMock from "../mock/MusicDatabaseMock";

describe("endpoint of creating music", () => {
  test("Returns error: When some field is not filled", async () => {
    expect.assertions(1);

    try {
      const createMusic = new CreateMusicBusiness(
        authenticatorMock,
        userDataBaseMock,
        generateIdMock,
        musicDatabaseMock
      );

      const newMusic: Music = {
        title: "",
        album: "test",
        author: "Ana test",
        file: "link",
        genre: ["rock"],
      };

      const token: string = "token";

      await createMusic.execute(newMusic, token);
    } catch (error) {
      expect(error.message).toBe(
        "Fields 'title', 'genre', 'file', 'date', 'author' and 'album' are required"
      );
    }
  });

  test("Returns error: token not passed", async () => {
    expect.assertions(1);

    try {
      const createMusic = new CreateMusicBusiness(
        authenticatorMock,
        userDataBaseMock,
        generateIdMock,
        musicDatabaseMock
      );

      const newMusic: Music = {
        title: "test",
        album: "test",
        author: "Ana test",
        file: "link",
        genre: ["rock"],
      };

      const token: string = "";

      await createMusic.execute(newMusic, token);
    } catch (error) {
      expect(error.message).toBe("Not authorized");
    }
  });

  test("In case of success", async () => {
    const createMusic = new CreateMusicBusiness(
      authenticatorMock,
      userDataBaseMock,
      generateIdMock,
      musicDatabaseMock
    );

    const newMusic: Music = {
      title: "test",
      album: "test",
      author: "Ana test",
      file: "link",
      genre: ["rock"],
    };

    const token: string = "token";

    const result = await createMusic.execute(newMusic, token);

    expect(result.message).toBe("Created!");
  });
});
