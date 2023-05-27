import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [NoticesController],
  providers: [NoticesService, PrismaService],
})
export class NoticesModule {}
