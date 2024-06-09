import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(dto: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Promise<boolean>;
}
