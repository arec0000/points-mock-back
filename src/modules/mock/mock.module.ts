import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "src/config/jwt.config";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { FileService } from "src/services/file.service";
import { MockController } from "./mock.controller";
import { OnboardingService } from "./onboarding.service";
import { LanguageService } from "src/services/language.service";
import { TaskService } from "./task.service";
import { UserService } from "src/services/user.service";

@Module({
  controllers: [MockController],
  providers: [
    JwtStrategy,
    UserService,
    PrismaService,
    FileService,
    OnboardingService,
    LanguageService,
    TaskService,
  ],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class MockModule {}
