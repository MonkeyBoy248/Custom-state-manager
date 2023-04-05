export type Subscriber<T> = (value: T) => void;
export interface Subscribable<T> {
  subscribe: (subscriber: Subscriber<T>) => () => void;
  publish: (value: T) => void;
}