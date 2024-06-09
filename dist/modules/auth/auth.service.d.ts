import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserService } from "src/services/user.service";
import { GoogleService } from "./google.service";
export declare class AuthService {
    private jwt;
    private userService;
    private readonly googleService;
    TOKEN_EXPIRE_DAY: number;
    constructor(jwt: JwtService, userService: UserService, googleService: GoogleService);
    devSignIn(res: Response, email: string): Promise<Response<any, Record<string, any>>>;
    signInWithGoogle(res: Response, token: string): Promise<Response<any, Record<string, any>>>;
    addTokenToResponse(res: Response, token: string): void;
    verifyToken(token: string): any;
    removeRefreshTokenFromResponse(res: Response): void;
    private issueToken;
}
