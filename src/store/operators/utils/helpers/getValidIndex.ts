import { Predicate } from '../../types';
import { isPredicate } from './isPredicate';

export function getValidIndex<T>(selector: number | Predicate<T>, existing: T[]): null | number {
  const index = isPredicate(selector) ? existing.findIndex(selector) : selector;

  if (index === -1 || Number.isNaN(index)) {
    return null;
  }

  return index;
}