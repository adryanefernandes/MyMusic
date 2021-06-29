import { genSaltSync, hashSync } from "bcryptjs";

export class HashManager {
  createHash(password: string) {
    const cost: number = Number(process.env.BCRYPT_COST);
    const salt: string = genSaltSync(cost);
    const hash: string = hashSync(password, salt);

    return hash;
  }
}

export default new HashManager();
