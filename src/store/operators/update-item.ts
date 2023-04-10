import { Operator, Predicate } from '../../types/operators';
import { getValidIndex } from './utils/helpers/getValidIndex';
import { isOperator } from './utils/helpers/isOperator';

export function updateItem<T>(
  selector: number | Predicate<T>,
  update: T | Operator<T>
): Operator<T[]> {
  return (current: T[]): T[] => {
    const index = getValidIndex(selector, current);

    if (index === null) {
      return current;
    }

    const elementToUpdate = current[index];
    const updateValue = isOperator(update) ? update(elementToUpdate) : update;

    const copy = current.slice();
    copy[index] = updateValue;

    return copy;
  };
}
