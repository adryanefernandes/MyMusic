import { AuthenticatorData } from "../../src/model/authenticatorInterface";

export class AuthenticatorMock {
  generateToken(payload: AuthenticatorData): string {
    return "token";
  }

  getTokenData(token: string): AuthenticatorData {
    return { id: "id" };
  }
}

export default new AuthenticatorMock();
