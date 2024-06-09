import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async getByUserId({ userId }: { userId: number }) {
    return this.prisma.onboarding.findUnique({
      where: { userId },
      select: { countryTitle: true },
    });
  }

  async create({
    userId,
    countryTitle,
  }: {
    userId: number;
    countryTitle: string;
  }) {
    return this.prisma.onboarding.create({ data: { userId, countryTitle } });
  }
}
