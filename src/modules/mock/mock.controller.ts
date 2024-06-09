import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CurrentUser } from "src/decorators/user.decorator";
import { FileService } from "src/services/file.service";
import { Auth } from "src/decorators/auth.decorator";
import { OnboardingService } from "./onboarding.service";
import { OnboardingDto } from "./dto/onboarding.dto";
import { LanguageService } from "src/services/language.service";
import { TaskService } from "./task.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { TaskDto } from "./dto/task.dto";

@Controller("mock")
export class MockController {
  constructor(
    private readonly fileService: FileService,
    private readonly onboardingService: OnboardingService,
    private readonly languageService: LanguageService,
    private readonly taskService: TaskService,
  ) {}

  @Auth()
  @HttpCode(201)
  @Post("onboarding")
  async postOnboarding(
    @CurrentUser("id") userId: number,
    @Body() { countryTitle }: OnboardingDto,
  ) {
    const data = await this.onboardingService.getByUserId({ userId });

    if (data) {
      throw new BadRequestException();
    }

    return this.onboardingService.create({ userId, countryTitle });
  }

  @Auth()
  @HttpCode(200)
  @Get("onboarding")
  async getOnboarding(@CurrentUser("id") userId: number) {
    const data = await this.onboardingService.getByUserId({ userId });

    if (!data) {
      throw new NotFoundException();
    }

    return {
      ...data,
      countryTitleFormated: this.languageService.formatCountry(
        data.countryTitle,
      ),
    };
  }

  @Auth()
  @HttpCode(201)
  @Post("task")
  @UseInterceptors(FileInterceptor("image"))
  async postTask(
    @CurrentUser("id") userId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() { taskId }: TaskDto,
  ) {
    const data = await this.taskService.get({ id: taskId, userId });

    if (data) {
      throw new BadRequestException();
    }

    if (file) {
      const storedFile = await this.fileService.uploadImage(file, {
        tags: [{ Key: "image-type", Value: "doc" }],
      });

      return this.taskService.create({
        id: taskId,
        userId,
        file: storedFile.path,
      });
    }

    return this.taskService.create({ id: taskId, userId });
  }

  @Auth()
  @HttpCode(202)
  @Put("task")
  @UseInterceptors(FileInterceptor("image"))
  async putTask(
    @CurrentUser("id") userId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() { taskId }: TaskDto,
  ) {
    const data = await this.taskService.get({ id: taskId, userId });

    if (!data) {
      throw new NotFoundException();
    }

    if (file) {
      const storedFile = await this.fileService.uploadImage(file, {
        tags: [{ Key: "image-type", Value: "doc" }],
      });

      return this.taskService.update({
        id: taskId,
        file: storedFile.path,
      });
    }
  }

  @Auth()
  @HttpCode(200)
  @Get("task/:id")
  async getTask(@CurrentUser("id") userId: number, @Param("id") id: string) {
    const data = await this.taskService.get({ id, userId });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  @Auth()
  @HttpCode(200)
  @Get("tasks")
  async getTasks(@CurrentUser("id") userId: number) {
    const data = await this.taskService.getMany(userId);

    if (!data.length) {
      throw new NotFoundException();
    }

    return data;
  }
}
