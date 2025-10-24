import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createResettableStore } from './createResettableStore';

export const createAppStore = <T>(
  name: string,
  store: StateCreator<T, [['zustand/devtools', never]], [], T>,
  isResettable: boolean = true
) => {
  if (isResettable) {
    return createResettableStore<T>(name, devtools(store, { name }));
  }
  return create<T>()(
    devtools(store, {
      name,
    })
  );
};

export type AppStoreCreator<MainStore, ThisStore> = StateCreator<
  MainStore,
  [['zustand/devtools', never]],
  [],
  ThisStore
>;