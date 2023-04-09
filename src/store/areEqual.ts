export function areEqual<T>(firstValue: T, secondValue: T): boolean {
  if (Object.is(firstValue, secondValue)) {
    return true;
  }

  if (
    typeof firstValue !== 'object' ||
    firstValue === null ||
    typeof secondValue !== 'object' ||
    secondValue === null
  ) {
    return false;
  }

  if (firstValue instanceof Map && secondValue instanceof Map) {
    if (firstValue.size !== secondValue.size) {
      return false;
    }

    for (const [key, value] of firstValue) {
      if (!Object.is(value, secondValue.get(key))) {
        return false;
      }
    }

    return true;
  }

  if (firstValue instanceof Set && secondValue instanceof Set) {
    if (firstValue.size !== secondValue.size) {
      return false;
    }

    for (const value of firstValue) {
      if (secondValue.has(value)) {
        return false;
      }
    }

    return true;
  }

  const [firstValueKeys, secondValueKeys] = [
    Object.keys(firstValue),
    Object.keys(secondValue),
  ];

  if (firstValueKeys.length !== secondValueKeys.length) {
    return false;
  }

  for (const key of firstValueKeys) {
    if (!Object.hasOwn(secondValue, key)) {
      return false;
    }

    if (!Object.is(firstValue[key as keyof T], secondValue[key as keyof T])) {
      return false;
    }

    return true;
  }

  return true;
}