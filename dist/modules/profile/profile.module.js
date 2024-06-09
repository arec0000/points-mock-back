"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const prisma_service_1 = require("../../prisma.service");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const user_service_1 = require("../../services/user.service");
const file_service_1 = require("../../services/file.service");
const profile_controller_1 = require("./profile.controller");
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
        providers: [jwt_strategy_1.JwtStrategy, user_service_1.UserService, prisma_service_1.PrismaService, file_service_1.FileService],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], ProfileModule);
//# sourceMappingURL=profile.module.js.map