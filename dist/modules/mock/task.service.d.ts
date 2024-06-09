import { PrismaService } from "src/prisma.service";
export declare class TaskService {
    private prisma;
    constructor(prisma: PrismaService);
    getMany(userId: number): Promise<{
        id: string;
        userId: number;
        file: string;
    }[]>;
    get({ id, userId }: {
        id: string;
        userId: number;
    }): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
    create(data: {
        id: string;
        userId: number;
        file?: string;
    }): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
    update({ id, file }: {
        id: string;
        file: string;
    }): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
}
