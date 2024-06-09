import { Injectable } from "@nestjs/common";

type GoogleResponse =
  | {
      email: string;
      family_name: string;
      given_name: string;
      id: string;
      locale: string;
      name: string;
      picture: string;
      verified_email: boolean;
    }
  | {
      error: {
        code: number;
        message: string;
        status: string;
      };
    };

@Injectable()
export class GoogleService {
  async getUserData(token: string): Promise<GoogleResponse> {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    );

    return res.json();
  }
}
