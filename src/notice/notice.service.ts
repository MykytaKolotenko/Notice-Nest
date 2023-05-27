import { Injectable } from '@nestjs/common';
import { Prisma, notices } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.noticesCreateInput): Promise<notices> {
    return this.prisma.notices.create({
      data,
    });
  }
}
