import { isOperator } from './operators/utils/helpers/isOperator';
import { createSubscribable } from './subscribable';
import { StateCreator, Store } from '../types/store';
import { UpdateObject } from '../types/operators';

export function createStore<State>(
  stateCreator: StateCreator<State>
): Store<State> {
  let state: ReturnType<typeof stateCreator>;
  const subscribable = createSubscribable<State>();

  const getState = (): State => {
    return state;
  };

  const subscribe = subscribable.subscribe;

  const updateState = (updateObject: UpdateObject<State> | ((value: State) => UpdateObject<State>)): void => {
    const stateSliceValue =
      typeof updateObject === 'function' ? updateObject(state) : updateObject;
    const copy: Partial<State> = {};

    for (const key in stateSliceValue) {
      const nextValue = stateSliceValue[key];
      const oldStateValue = state[key];
      const newStateValue = isOperator(nextValue) ? nextValue(oldStateValue) : nextValue;

      if (Object.is(newStateValue, oldStateValue)) {
        continue;
      }

      copy[key] = newStateValue as State[Extract<keyof State, string>];
    }

    state = Object.assign({}, state, copy);
    subscribable.publish(state);
  };

  const storeApi = { updateState, getState, subscribe };
  state = stateCreator(updateState, getState);

  return storeApi;
}
