import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  async getUserInfo(accessToken: string): Promise<{ sub: string }> {
    const apiUrl = process.env.AUTH0_ISSUER_URL;
    return await fetch(`${apiUrl}userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
