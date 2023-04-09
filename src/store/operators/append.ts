export function append<T>(existing: T[], items: T[]): T[] {
  if (!items.length && !existing.length) {
    return [] as T[];
  }

  if (!items.length) {
    return existing;
  }

  return existing.concat(items);
}
