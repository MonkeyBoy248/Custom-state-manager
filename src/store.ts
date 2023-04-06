import { createSubscribable } from './subscribable';
import { StateSlice, Store, Subscriber } from './types';

export function createStore<State>(state: State): Store<State> {
  const subscribable = createSubscribable<State>();

  return {
    getState: (): State => {
      return state;
    },

    subscribe: (subscriber: Subscriber<State>) => {
      subscribable.subscribe(subscriber);
    },

    updateState: (stateSlice: StateSlice<State>): void => {
      const newState =
        typeof stateSlice === 'function' ? stateSlice(state) : stateSlice;

      if (Object.is(newState, state)) {
        return;
      }

      state =
        typeof newState !== 'object'
          ? newState
          : Object.assign({}, state, newState);
      subscribable.publish(state);
    },
  };
}
