import { HttpException } from '@nestjs/common';

export default class CustomError extends HttpException {
  constructor(name: string, status: number) {
    super(name, status);
  }
}
