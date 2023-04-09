import { Predicate } from './types';
import { getValidIndex } from './utils/helpers/getValidIndex';

export function removeItem<T>(selector: number | Predicate<T>, existing: T[]): T[] {
  const index = getValidIndex(selector, existing);

  if (index === null) {
    return existing;
  }

  const copy = existing.slice();
  copy.splice(index, 1);

  return copy;
}