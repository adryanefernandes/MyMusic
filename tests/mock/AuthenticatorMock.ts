import { AuthenticatorData } from "../../src/model/authenticatorInterface"

export class AuthenticatorMock {
  generateToken(payload: AuthenticatorData): string{
    return "token"
  }
}

export default new AuthenticatorMock()