export class AuthUser {
    constructor(
      public accessToken: string,
      public expiresIn: number,
      public tokenType: string
    ) {}
  }
  