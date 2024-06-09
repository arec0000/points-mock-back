"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../../decorators/user.decorator");
const file_service_1 = require("../../services/file.service");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const onboarding_service_1 = require("./onboarding.service");
const onboarding_dto_1 = require("./dto/onboarding.dto");
const language_service_1 = require("../../services/language.service");
const task_service_1 = require("./task.service");
const platform_express_1 = require("@nestjs/platform-express");
const task_dto_1 = require("./dto/task.dto");
let MockController = class MockController {
    constructor(fileService, onboardingService, languageService, taskService) {
        this.fileService = fileService;
        this.onboardingService = onboardingService;
        this.languageService = languageService;
        this.taskService = taskService;
    }
    async postOnboarding(userId, { countryTitle }) {
        const data = await this.onboardingService.getByUserId({ userId });
        if (data) {
            throw new common_1.BadRequestException();
        }
        return this.onboardingService.create({ userId, countryTitle });
    }
    async getOnboarding(userId) {
        const data = await this.onboardingService.getByUserId({ userId });
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return {
            ...data,
            countryTitleFormated: this.languageService.formatCountry(data.countryTitle),
        };
    }
    async postTask(userId, file, { taskId }) {
        const data = await this.taskService.get({ id: taskId, userId });
        if (data) {
            throw new common_1.BadRequestException();
        }
        if (file) {
            const storedFile = await this.fileService.uploadImage(file, {
                tags: [{ Key: "image-type", Value: "doc" }],
            });
            return this.taskService.create({
                id: taskId,
                userId,
                file: storedFile.path,
            });
        }
        return this.taskService.create({ id: taskId, userId });
    }
    async putTask(userId, file, { taskId }) {
        const data = await this.taskService.get({ id: taskId, userId });
        if (!data) {
            throw new common_1.NotFoundException();
        }
        if (file) {
            const storedFile = await this.fileService.uploadImage(file, {
                tags: [{ Key: "image-type", Value: "doc" }],
            });
            return this.taskService.update({
                id: taskId,
                file: storedFile.path,
            });
        }
    }
    async getTask(userId, id) {
        const data = await this.taskService.get({ id, userId });
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
    async getTasks(userId) {
        const data = await this.taskService.getMany(userId);
        if (!data.length) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
};
exports.MockController = MockController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("onboarding"),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, onboarding_dto_1.OnboardingDto]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "postOnboarding", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("onboarding"),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "getOnboarding", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("task"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "postTask", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(202),
    (0, common_1.Put)("task"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "putTask", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("task/:id"),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "getTask", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("tasks"),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MockController.prototype, "getTasks", null);
exports.MockController = MockController = __decorate([
    (0, common_1.Controller)("mock"),
    __metadata("design:paramtypes", [file_service_1.FileService,
        onboarding_service_1.OnboardingService,
        language_service_1.LanguageService,
        task_service_1.TaskService])
], MockController);
//# sourceMappingURL=mock.controller.js.map