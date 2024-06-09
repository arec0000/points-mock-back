import { IsEmail, IsString, IsOptional } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  googleCode: string;
}
