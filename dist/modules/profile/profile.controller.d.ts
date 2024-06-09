/// <reference types="multer" />
import { UserService } from "src/services/user.service";
import { ProfileDto } from "./dto/profile.dto";
import { FileService } from "src/services/file.service";
import type { User } from "@prisma/client";
export declare class ProfileController {
    private readonly userService;
    private readonly fileService;
    constructor(userService: UserService, fileService: FileService);
    getProfile(user: User): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    putProfile(id: number, dto: ProfileDto): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
    putAvatar(id: number, file: Express.Multer.File): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
}
