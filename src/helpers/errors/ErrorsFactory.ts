import { BadRequestException } from '@nestjs/common';
import CustomError from './CustomError';

export default class ErrorsFactory {
  static create(type: string) {
    switch (type) {
      case 'title':
        return new CustomError('Title is required', 404);

      case 'text':
        return new CustomError('Text is required', 404);

      case 'uknown server error':
        return new CustomError('Unknown Error', 520);

      case 'notice not found':
        return new CustomError('Notice not found', 404);

      case 'incorect id':
        return new CustomError('Insert correct id', 404);

      // __________________auth______________________________________

      case 'email':
        return new CustomError('Email is required', 404);

      case 'password ':
        return new CustomError('Password is required', 404);

      case 'user not found':
        return new CustomError('Email or password wrong. User not found!', 404);

      default:
        return new BadRequestException();
    }
  }
}
