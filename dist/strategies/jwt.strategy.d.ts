import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserService } from "../services/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate({ id }: {
        id: number;
    }): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string;
    }>;
}
export {};
