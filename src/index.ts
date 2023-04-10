export { append } from './store/operators/append';
export { removeItem } from './store/operators/remove-item';
export { updateItem } from './store/operators/update-item';
export { create } from './store/reactStore';
export { createStore } from './store/baseStore';
export { equalityFunction } from './store/equalityFunction';
export type { Predicate, Operator, UpdateObject } from './types/operators';
export type {
  Selector,
  StateCreator,
  Store,
  EqualityFunction,
} from './types/store';
