import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { notice } from '@prisma/client';
import throwError from '../errors';

export interface INotice {
  title: string;
  text: string;
}

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  async findall(): Promise<Array<notice>> {
    return await this.noticesService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: INotice): Promise<notice> {
    if (!data.title) throwError('title');
    if (!data.text) throwError('text');

    return await this.noticesService.create(data);
  }
}
