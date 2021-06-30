import { LoginBusiness } from "../../src/business/LoginBusiness";
import { UserLogin } from "../../src/model/userInterface";
import authenticatorMock from "../mock/AuthenticatorMock";
import hashManagerMock from "../mock/HashManagerMock";
import userDatabaseMockResults from "../mock/UserDatabaseMockResults";

describe("Login tests", () => {
  test("Returns error: some field was not filled", async () => {
    expect.assertions(1);

    try {
      const loginBusiness = new LoginBusiness(
        userDatabaseMockResults,
        hashManagerMock,
        authenticatorMock
      );

      const userMock: UserLogin = {
        email: "",
        password: "123456",
      };

      await loginBusiness.execute(userMock);
    } catch (error) {
      expect(error.message).toBe("Fields 'name' and 'password' are required");
    }
  });

  test("Returns error: incorrect password", async () => {
    expect.assertions(1);

    try {
      const loginBusiness = new LoginBusiness(
        userDatabaseMockResults,
        hashManagerMock,
        authenticatorMock
      );

      const userMock: UserLogin = {
        email: "test@test.com",
        password: "123456",
      };

      await loginBusiness.execute(userMock);
    } catch (error) {
      expect(error.message).toBe("Incorrect password");
    }
  });

  test("Success: If all fields are completed and password is correct", async () => {
      const loginBusiness = new LoginBusiness(
        userDatabaseMockResults,
        hashManagerMock,
        authenticatorMock
      );

      const userMock: UserLogin = {
        email: "test@test.com",
        password: "correctPassword",
      };

      const result = await loginBusiness.execute(userMock);

      expect(result).toBe('token')
  });
});
