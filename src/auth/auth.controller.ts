import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { user } from '@prisma/client';
import { IBodyData, IToken } from './auth.dto';
import throwError from 'src/helpers/errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('register')
  async register(@Body() { email, password }: IBodyData): Promise<user> {
    if (!email) throwError('email');
    if (!password) throwError('password');

    return await this.authService.createUser({ email, password });
  }

  @Patch('signin')
  async login(@Body() { email, password }: IBodyData): Promise<IToken> {
    if (!email) throwError('email');
    if (!password) throwError('password');

    const token = await this.authService.createAccessToken(email, password);

    return await this.authService.setAccessToken(email, token);
  }

  @Get('current')
  current(): string {
    return 'current';
  }

  @Get('logout')
  logout(): string {
    return 'logout';
  }
}
