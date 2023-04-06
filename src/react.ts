import { useCallback, useSyncExternalStore } from 'react';
import { Store } from './types';

export function useStore<State, StateSlice extends State | Partial<State>>(
  store: Store<State>,
  selector: (state: State) => StateSlice = (state: State) => state as StateSlice
) {
  let currentState = store.getState();
  const getSnapshot = () => selector(store.getState());

  return useSyncExternalStore<StateSlice>(
    useCallback((callback) => {
      return store.subscribe((state) => {
        const nextState = selector(state);

        if (currentState !== nextState) {
          store.updateState(nextState);
          callback();
        }
      });
    }, []),
    getSnapshot,
    getSnapshot
  );
}

export function createStore<State>(store: Store<State>) {}
