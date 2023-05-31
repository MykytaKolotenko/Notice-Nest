import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { user } from '@prisma/client';
import { IBodyData, IToken } from './auth.dto';
import Hash from 'src/helpers/hash';
import { JwtService } from '@nestjs/jwt';
import throwError from 'src/helpers/errors';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser({ email, password }: IBodyData): Promise<user> {
    const hashedPassword = await Hash.hashPassword(password);

    const data = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    if (!data) throwError(`Unknown Error`);

    return data;
  }

  async findUser(email: string): Promise<user> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createAccessToken(email: string, password: string): Promise<string> {
    const userData = await this.findUser(email);
    if (!userData) throwError('user not found');

    const isPasswordValid = await Hash.compare(password, userData.password);
    if (!isPasswordValid) throwError('user not found');

    const payload = { id: userData.id, username: userData.email };
    return await this.jwtService.signAsync(payload);
  }

  async setAccessToken(email: string, accessToken: string): Promise<IToken> {
    const { token } = await this.prisma.user.update({
      where: { email },
      data: { token: accessToken },
    });

    if (!token) throwError('uknown server error');

    return { access_token: token };
  }
}
