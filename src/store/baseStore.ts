import { createSubscribable } from './subscribable';
import { StateCreator, StateSlice, Store } from './types';

export function createStore<State>(
  stateCreator: StateCreator<State>
): Store<State> {
  let state: State;
  const subscribable = createSubscribable<State>();

  const getState = (): State => {
    return state;
  };

  const subscribe = subscribable.subscribe;

  const updateState = (stateSlice: StateSlice<State>): void => {
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
  };

  const storeApi = { updateState, getState, subscribe };
  state = stateCreator(updateState, getState);

  return storeApi;
}
