import { IsString } from "class-validator";

export class OnboardingDto {
  @IsString()
  countryTitle: string;
}
