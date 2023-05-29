import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { notice } from '@prisma/client';
import throwError from '../helpers/errors';

export interface INotice {
  id: string;
  title: string;
  text: string;
}

export interface IParams {
  id: string;
}

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  async findAll(): Promise<Array<notice>> {
    const data: Array<notice> = await this.noticesService.findAll();

    if (!data) throwError('uknown server error');

    return data;
  }

  @Get(':id')
  async findOne(@Param() { id }: IParams): Promise<notice> {
    const data: notice = await this.noticesService.findOne(id);

    if (!data) throwError('notice not found');

    return data;
  }

  @Post()
  async create(@Body() data: INotice): Promise<notice> {
    if (!data.title) throwError('title');
    if (!data.text) throwError('text');

    return await this.noticesService.create(data);
  }

  @Delete(':id')
  async delete(@Param() { id }: IParams): Promise<notice> {
    const data: notice = await this.noticesService.delete(id);

    if (!data) throwError('notice not found');

    return data;
  }

  @Patch(':id')
  async update(@Param() { id }: IParams, data: INotice): Promise<notice> {
    return await this.noticesService.update(id, data);
  }
}
