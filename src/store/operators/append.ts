import { Operator } from './types';

export function append<T>(items: T[]): Operator<T[]> {
  return (current: T[]): T[] => {
    if (!items.length && !current.length) {
      return [] as T[];
    }

    if (!items.length) {
      return current;
    }

    return current.concat(items);
  }
}
