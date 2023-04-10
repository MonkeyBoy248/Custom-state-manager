import { Predicate } from '../../../../types/operators';

export function isPredicate<T>(value: number | Predicate<T>): value is Predicate<T> {
  return typeof value === 'function'
}