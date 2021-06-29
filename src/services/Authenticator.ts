import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthenticatorData } from "../model/authenticatorInterface"

dotenv.config()

export class Authenticator {
  generateToken(payload: AuthenticatorData): string{
    const token =  jwt.sign(
      payload, 
      process.env.JWT_KEY as string, 
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

    return token
  }
}

export default new Authenticator()