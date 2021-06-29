export class HashManagerMock {
  createHash(password: string) {
    return "string";
  }
}

export default new HashManagerMock();
