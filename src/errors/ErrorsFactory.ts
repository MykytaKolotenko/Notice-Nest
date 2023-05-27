import { BadRequestException } from '@nestjs/common';
import CustomError from './CustomError';

export default class ErrorsFactory {
  static create(type: string) {
    switch (type) {
      case 'title':
        return new CustomError('Title is required', 404);

      case 'text':
        return new CustomError('Text is required', 404);

      default:
        return new BadRequestException();
    }
  }
}
