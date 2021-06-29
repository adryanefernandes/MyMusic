import { CustomError } from "../error/CustomError";

export class FeildIsValid {
  emailIsValid(email: string): void{
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test(email)){
          throw new CustomError(400, 'email format is incorrect. email@anystring.anystring')
      }
  }
}

export default new FeildIsValid()