import { Operator, Predicate } from './types';
import { getValidIndex } from './utils/helpers/getValidIndex';
import { isOperator } from './utils/helpers/isOperator';

export function updateItem<T>(selector: number | Predicate<T>, update: T | Operator<T>, existing: T[]): T[] {
  const index = getValidIndex(selector, existing);

  if (index === null) {
    return existing;
  }

  const elementToUpdate = existing[index];
  const updateValue = isOperator(update) ? update(elementToUpdate) : update;

  const copy = existing.slice();
  copy[index] = updateValue;

  return copy;
}