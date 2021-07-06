export interface User { 
  id?: string,
  name: string,
  nickname: string,
  email: string,
  password: string
}

export interface UserLogin {
  email: string,
  password: string
}
