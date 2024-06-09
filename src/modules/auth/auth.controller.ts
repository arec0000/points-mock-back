import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(202)
  @Post("sign-in")
  async signIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (dto.email && dto.code) {
    }

    if (dto.googleCode) {
      const response = await this.authService.signInWithGoogle(
        res,
        dto.googleCode,
      );

      return response.send("ok");
    }

    throw new BadRequestException();
  }

  @HttpCode(202)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);
    return true;
  }
}
