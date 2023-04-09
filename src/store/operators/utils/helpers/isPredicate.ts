import { Predicate } from '../../types';

export function isPredicate<T>(value: number | Predicate<T>): value is Predicate<T> {
  return typeof value === 'function'
}