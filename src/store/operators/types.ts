export type Predicate<T> = (value: T) => boolean;
export type Operator<T> = (value: T) => T;
export type UpdateObject<T> = { [P in keyof T]?: T[P] | Operator<T[P]> };