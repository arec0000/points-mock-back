import { IsEmail, IsString, Length, IsOptional } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @Length(6, 6, {
    message: "Сode must be 6 characters long",
  })
  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  googleCode: string;
}
