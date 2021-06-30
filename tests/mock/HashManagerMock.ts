export class HashManagerMock {
  createHash(password: string) {
    return "string";
  }

  compareHash(password: string, hash: string): boolean{
    if(password !== hash){
      return false
    }

    return true
  }
}

export default new HashManagerMock();
