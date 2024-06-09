import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "src/config/jwt.config";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { UserService } from "src/services/user.service";
import { FileService } from "src/services/file.service";
import { ProfileController } from "./profile.controller";

@Module({
  controllers: [ProfileController],
  providers: [JwtStrategy, UserService, PrismaService, FileService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class ProfileModule {}
