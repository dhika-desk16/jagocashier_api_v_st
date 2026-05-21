import { ConfigService } from '@nestjs/config';
import { AuthUserInterface } from "../../interfaces/auth-user.interface";
import { JwtPayload } from "../../interfaces/jwt-payload.interface";
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): AuthUserInterface;
}
export {};
