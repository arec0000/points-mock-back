import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserService } from "src/services/user.service";
import { GoogleService } from "./google.service";
import { TOKEN_NAME } from "src/constants";

@Injectable()
export class AuthService {
  TOKEN_EXPIRE_DAY = 7;

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private readonly googleService: GoogleService,
  ) {}

  async devSignIn(res: Response, email: string) {
    let user = await this.userService.getByEmail(email);

    if (!user) {
      user = await this.userService.create({ email });
    }

    const accessToken = await this.issueToken(user.id);

    this.addTokenToResponse(res, accessToken);

    return res;
  }

  async signInWithGoogle(res: Response, token: string) {
    const googleUserData = await this.googleService.getUserData(token);

    if ("error" in googleUserData) {
      throw new BadRequestException();
    }

    const user = await this.userService.getByEmail(googleUserData.email);

    if (user) {
      const accessToken = await this.issueToken(user.id);

      this.addTokenToResponse(res, accessToken);
    } else {
      const newUser = await this.userService.create({
        email: googleUserData.email,
        name: googleUserData.given_name,
        avatar: googleUserData.picture,
      });

      const accessToken = await this.issueToken(newUser.id);

      this.addTokenToResponse(res, accessToken);
    }

    return res;
  }

  addTokenToResponse(res: Response, token: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.TOKEN_EXPIRE_DAY);

    res.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      domain: process.env.DOMAIN,
      expires: expiresIn,
      secure: true,
      sameSite: "lax",
    });
  }

  verifyToken(token: string) {
    return this.jwt.verify(token);
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(TOKEN_NAME, "", {
      httpOnly: true,
      domain: process.env.DOMAIN,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
  }

  private async issueToken(userId: number) {
    return this.jwt.sign(
      {
        id: userId,
      },
      {
        expiresIn: "7d",
      },
    );
  }
}
