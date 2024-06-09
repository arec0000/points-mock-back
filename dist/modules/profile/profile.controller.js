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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user.service");
const user_decorator_1 = require("../../decorators/user.decorator");
const profile_dto_1 = require("./dto/profile.dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../../services/file.service");
const auth_decorator_1 = require("../../decorators/auth.decorator");
let ProfileController = class ProfileController {
    constructor(userService, fileService) {
        this.userService = userService;
        this.fileService = fileService;
    }
    async getProfile(user) {
        return user;
    }
    async putProfile(id, dto) {
        return this.userService.update({ ...dto, id });
    }
    async putAvatar(id, file) {
        const storedFile = await this.fileService.uploadImage(file, {
            tags: [{ Key: "image-type", Value: "avatar" }],
        });
        return this.userService.updateAvatar({ id, avatar: storedFile.path });
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("data"),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(202),
    (0, common_1.Put)("credentials"),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "putProfile", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(202),
    (0, common_1.Put)("avatar"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, user_decorator_1.CurrentUser)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "putAvatar", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)("profile"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        file_service_1.FileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map