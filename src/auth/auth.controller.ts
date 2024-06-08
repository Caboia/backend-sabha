// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: { username: string, password: string }) {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); 
    try {
      const user = await this.usersService.createUser(username, hashedPassword);
      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      throw new HttpException('Erro ao criar usuário.', HttpStatus.BAD_REQUEST);
    }
  }

  // Endpoint para fazer login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: { username: string, password: string }) {
    try {
      const result = await this.authService.login(loginUserDto.username, loginUserDto.password);
      return { message: 'Login bem-sucedido!', ...result };
    } catch (error) {
      throw new HttpException('Credenciais inválidas.', HttpStatus.UNAUTHORIZED);
    }
  }
}
