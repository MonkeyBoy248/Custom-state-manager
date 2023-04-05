import { Subscribable, Subscriber } from './types';


export function createSubscribable<T>(): Subscribable<T> {
  const subscribers = new Set<Subscriber<T>>();

  return {
    subscribe: (subscriber: Subscriber<T>): (() => void) => {
      subscribers.add(subscriber);

      return () => subscribers.delete(subscriber);
    },
    publish: (value: T): void => {
      for (const subscriber of subscribers) {
        subscriber(value);
      }
    },
  };
}
