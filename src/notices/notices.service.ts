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

  async findOne(id: string): Promise<notice> {
    return await this.prisma.notice.findUnique({
      where: { id },
    });
  }

  async create(data: INotice): Promise<notice> {
    return await this.prisma.notice.create({ data });
  }

  async delete(id: string): Promise<notice> {
    return await this.prisma.notice.delete({
      where: { id },
    });
  }

  async update(id: string, data: INotice): Promise<notice> {
    return await this.prisma.notice.update({
      where: { id },
      data: { ...data },
    });
  }
}
