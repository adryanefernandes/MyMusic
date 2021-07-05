import { SignupBusiness } from "../../src/business/signupBusiness";
import { User } from "../../src/model/userInterfaces";
import authenticatorMock from "../mock/AuthenticatorMock";
import generateIdMock from "../mock/GenerateIdMock";
import hashManagerMock from "../mock/HashManagerMock";
import userDatabaseMockNoResults from "../mock/userDatabaseMockNoResults";

describe("signup test", () => {
  test("Returns error: some field was not filled", async () => {
    expect.assertions(1);

    try {
      const signupBusiness = new SignupBusiness(
        userDatabaseMockNoResults,
        generateIdMock,
        hashManagerMock,
        authenticatorMock
      );

      const user: User = {
        name: "",
        nickname: "teste011",
        email: "test@gamil.com",
        password: "123456",
      };

      await signupBusiness.execute(user);
    } catch (error) {
      expect(error.message).toBe(
        "Fields 'name', 'email, 'nickname' and 'password' are required"
      );
    }
  });

  test("Returns error: email in invalid format", async () => {
    expect.assertions(1);

    try {
      const signupBusiness = new SignupBusiness(
        userDatabaseMockNoResults,
        generateIdMock,
        hashManagerMock,
        authenticatorMock
      );

      const user: User = {
        name: "teste",
        nickname: "teste011",
        email: "test.gamil.com",
        password: "123456",
      };

      await signupBusiness.execute(user);
    } catch (error) {
      expect(error.message).toBe(
        "email format is incorrect. email@anystring.anystring"
      );
    }
  });

  test("Returns error: password less than 6 characters", async () => {
    expect.assertions(1);

    try {
      const signupBusiness = new SignupBusiness(
        userDatabaseMockNoResults,
        generateIdMock,
        hashManagerMock,
        authenticatorMock
      );

      const user: User = {
        name: "teste",
        nickname: "teste011",
        email: "test@gamil.com",
        password: "123",
      };

      await signupBusiness.execute(user);
    } catch (error) {
      expect(error.message).toBe("Password must be at least 6 characters");
    }
  });

  test("Success: returns token", async () => {
    const signupBusiness = new SignupBusiness(
      userDatabaseMockNoResults,
      generateIdMock,
      hashManagerMock,
      authenticatorMock
    );

    const user: User = {
      name: "teste",
      nickname: "teste011",
      email: "test@gamil.com",
      password: "123456",
    };

    const result = await signupBusiness.execute(user);

    expect(result).toBe("token");
  });
});
