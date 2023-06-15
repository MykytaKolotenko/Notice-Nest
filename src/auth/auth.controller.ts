import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { user } from '@prisma/client';
import { IBodyData, IToken } from './auth.dto';
import throwError from 'src/helpers/errors';
import { Request } from 'express';
import getTokenFromBearer from 'src/helpers/getTokenFromBearer';
// need to do another  validation through Nest

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { email, password }: IBodyData): Promise<user> {
    if (!email) throwError('email');
    if (!password) throwError('password');

    return await this.authService.createUser({ email, password });
  }

  @Post('signin')
  async login(@Body() { email, password }: IBodyData): Promise<IToken> {
    if (!email) throwError('email');
    if (!password) throwError('password');

    const token = await this.authService.createAccessToken(email, password);

    return await this.authService.setAccessToken(email, token);
  }

  @Get('current')
  async current(@Req() data: Request): Promise<user> {
    const token = getTokenFromBearer(data.header('Authorization'));
    return await this.authService.findUserByAccessToken(token);
  }

  @Get('logout')
  @HttpCode(204)
  async logout(@Req() data: Request): Promise<void> {
    const token = getTokenFromBearer(data.header('Authorization'));

    await this.authService.unsetToken(token);
  }
}
