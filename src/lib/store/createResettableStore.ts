import { create, StateCreator } from 'zustand';

type ResetCallback = () => void;
type Resetter = { name: string; resetCallback: ResetCallback };
const zustandResetters: Resetter[] = [];

export const createResettableStore = <T>(
  name: string,
  sc: StateCreator<T, [], [['zustand/devtools', never]], T>
) => {
  if (zustandResetters.find((resetter) => resetter.name === name)) {
    throw Error(`A slice with name '${name}' already exists`);
  }

  const store = create<T>()(sc);
  const initialState = store.getState();
  const resetter: Resetter = {
    name,
    resetCallback: () => {
      store.setState(initialState, true);
    },
  };
  zustandResetters.push(resetter);

  return store;
};

export const resetSlice = (name: string) => {
  zustandResetters.find((resetter) => resetter.name === name)?.resetCallback();
};

export const resetAllSlices = () => {
  for (const { resetCallback } of zustandResetters) {
    resetCallback();
  }
};