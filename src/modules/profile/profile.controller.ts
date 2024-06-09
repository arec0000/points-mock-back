import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "src/services/user.service";
import { CurrentUser } from "src/decorators/user.decorator";
import { ProfileDto } from "./dto/profile.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/services/file.service";
import { Auth } from "src/decorators/auth.decorator";
import type { User } from "@prisma/client";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Auth()
  @HttpCode(200)
  @Get("data")
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Auth()
  @HttpCode(202)
  @Put("credentials")
  async putProfile(@CurrentUser("id") id: number, @Body() dto: ProfileDto) {
    return this.userService.update({ ...dto, id });
  }

  @Auth()
  @HttpCode(202)
  @Put("avatar")
  @UseInterceptors(FileInterceptor("image"))
  async putAvatar(
    @CurrentUser("id") id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const storedFile = await this.fileService.uploadImage(file, {
      tags: [{ Key: "image-type", Value: "avatar" }],
    });

    return this.userService.updateAvatar({ id, avatar: storedFile.path });
  }
}
