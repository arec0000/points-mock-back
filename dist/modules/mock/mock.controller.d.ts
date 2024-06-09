/// <reference types="multer" />
import { FileService } from "src/services/file.service";
import { OnboardingService } from "./onboarding.service";
import { OnboardingDto } from "./dto/onboarding.dto";
import { LanguageService } from "src/services/language.service";
import { TaskService } from "./task.service";
import { TaskDto } from "./dto/task.dto";
export declare class MockController {
    private readonly fileService;
    private readonly onboardingService;
    private readonly languageService;
    private readonly taskService;
    constructor(fileService: FileService, onboardingService: OnboardingService, languageService: LanguageService, taskService: TaskService);
    postOnboarding(userId: number, { countryTitle }: OnboardingDto): Promise<{
        userId: number;
        countryTitle: string;
    }>;
    getOnboarding(userId: number): Promise<{
        countryTitleFormated: any;
        countryTitle: string;
    }>;
    postTask(userId: number, file: Express.Multer.File, { taskId }: TaskDto): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
    putTask(userId: number, file: Express.Multer.File, { taskId }: TaskDto): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
    getTask(userId: number, id: string): Promise<{
        id: string;
        userId: number;
        file: string;
    }>;
    getTasks(userId: number): Promise<{
        id: string;
        userId: number;
        file: string;
    }[]>;
}
