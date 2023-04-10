import { Store, StateCreator, Selector, EqualityFunction } from '../types/store';
import { createStore } from './baseStore';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';

export function useStore<Snapshot, Slice>(
  store: Store<Snapshot>,
  selector: Selector<Snapshot, Slice> = store.getState() as any,
  equalityFunction?: EqualityFunction<Slice>
): Slice {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    selector,
    equalityFunction
  );
}

export function create<State>(stateCreator: StateCreator<State>) {
  const store = createStore(stateCreator);

  const useStoreWrapper = <Slice>(selector?: Selector<State, Slice>, equalityFunction?: EqualityFunction<Slice>) =>
    useStore<State, Slice>(store, selector, equalityFunction);

  return useStoreWrapper;
}
