import { PrismaService } from "src/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        id: number;
        email: string;
        name: string;
    }[]>;
    getById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    getByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    create(data: {
        email: string;
        name?: string;
        avatar?: string;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    updateAvatar({ id, avatar }: {
        id: number;
        avatar: string;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    update({ id, name, email, }: {
        id: number;
        email: string;
        name: string;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
}
