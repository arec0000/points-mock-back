import { IsEmail, IsString } from "class-validator";

export class ProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
