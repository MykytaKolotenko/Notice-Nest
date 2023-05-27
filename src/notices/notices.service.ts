import { Injectable } from '@nestjs/common';
import { notice } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { INotice } from './notices.controller';

@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Array<notice>> {
    return await this.prisma.notice.findMany();
  }

  async create(data: INotice): Promise<notice> {
    return await this.prisma.notice.create({ data });
  }
}
