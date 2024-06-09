import { PrismaService } from "src/prisma.service";
export declare class OnboardingService {
    private prisma;
    constructor(prisma: PrismaService);
    getByUserId({ userId }: {
        userId: number;
    }): Promise<{
        countryTitle: string;
    }>;
    create({ userId, countryTitle, }: {
        userId: number;
        countryTitle: string;
    }): Promise<{
        userId: number;
        countryTitle: string;
    }>;
}
