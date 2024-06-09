"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const prisma_service_1 = require("../../prisma.service");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const file_service_1 = require("../../services/file.service");
const mock_controller_1 = require("./mock.controller");
const onboarding_service_1 = require("./onboarding.service");
const language_service_1 = require("../../services/language.service");
const task_service_1 = require("./task.service");
const user_service_1 = require("../../services/user.service");
let MockModule = class MockModule {
};
exports.MockModule = MockModule;
exports.MockModule = MockModule = __decorate([
    (0, common_1.Module)({
        controllers: [mock_controller_1.MockController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            file_service_1.FileService,
            onboarding_service_1.OnboardingService,
            language_service_1.LanguageService,
            task_service_1.TaskService,
        ],
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: jwt_config_1.getJwtConfig,
            }),
        ],
    })
], MockModule);
//# sourceMappingURL=mock.module.js.map