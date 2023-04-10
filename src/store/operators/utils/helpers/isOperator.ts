import { Operator } from '../../../../types/operators';

export function isOperator<T>(value: T | Operator<T>): value is Operator<T> {
  return typeof value === 'function';
}
