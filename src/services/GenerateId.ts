import {v4 as uuid} from 'uuid'

export class GenerateId {
  create(): string{
    return uuid()
  }
}

export default new GenerateId()