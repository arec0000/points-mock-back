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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../services/user.service");
const google_service_1 = require("./google.service");
const constants_1 = require("../../constants");
let AuthService = class AuthService {
    constructor(jwt, userService, googleService) {
        this.jwt = jwt;
        this.userService = userService;
        this.googleService = googleService;
        this.TOKEN_EXPIRE_DAY = 7;
    }
    async devSignIn(res, email) {
        let user = await this.userService.getByEmail(email);
        if (!user) {
            user = await this.userService.create({ email });
        }
        const accessToken = await this.issueToken(user.id);
        this.addTokenToResponse(res, accessToken);
        return res;
    }
    async signInWithGoogle(res, token) {
        const googleUserData = await this.googleService.getUserData(token);
        if ("error" in googleUserData) {
            throw new common_1.BadRequestException();
        }
        const user = await this.userService.getByEmail(googleUserData.email);
        if (user) {
            const accessToken = await this.issueToken(user.id);
            this.addTokenToResponse(res, accessToken);
        }
        else {
            const newUser = await this.userService.create({
                email: googleUserData.email,
                name: googleUserData.given_name,
                avatar: googleUserData.picture,
            });
            const accessToken = await this.issueToken(newUser.id);
            this.addTokenToResponse(res, accessToken);
        }
        return res;
    }
    addTokenToResponse(res, token) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.TOKEN_EXPIRE_DAY);
        res.cookie(constants_1.TOKEN_NAME, token, {
            httpOnly: true,
            domain: "localhost",
            expires: expiresIn,
            secure: true,
            sameSite: "lax",
        });
    }
    verifyToken(token) {
        return this.jwt.verify(token);
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(constants_1.TOKEN_NAME, "", {
            httpOnly: true,
            domain: "localhost",
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        });
    }
    async issueToken(userId) {
        return this.jwt.sign({
            id: userId,
        }, {
            expiresIn: "7d",
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        google_service_1.GoogleService])
], AuthService);
//# sourceMappingURL=auth.service.js.map