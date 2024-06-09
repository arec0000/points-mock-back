import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { MockModule } from "./modules/mock/mock.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProfileModule, MockModule],
})
export class AppModule {}
