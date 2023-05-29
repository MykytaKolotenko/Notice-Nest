import ErrorsFactory from './ErrorsFactory';

export default function throwError(type: string): void {
  throw ErrorsFactory.create(type);
}
