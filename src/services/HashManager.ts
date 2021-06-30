import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class HashManager {
  createHash(password: string): string {
    const cost: number = Number(process.env.BCRYPT_COST);
    const salt: string = genSaltSync(cost);
    const hash: string = hashSync(password, salt);

    return hash;
  }

  compareHash(password: string, hash: string): boolean{
    return compareSync(password, hash)
  }
}

export default new HashManager();
