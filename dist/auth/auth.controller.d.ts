import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(createUserDto: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    login(loginUserDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        message: string;
    }>;
}
