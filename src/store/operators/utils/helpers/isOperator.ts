import { Operator } from '../../types';

export function isOperator<T>(value: T | Operator<T>): value is Operator<T> {
  return typeof value === 'function';
}
