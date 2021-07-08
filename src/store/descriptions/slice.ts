import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDescription } from '../../types/types';

const initialState: TDescription[] = [];

const descriptionsSlice = createSlice({
  name: 'descriptions',
  initialState,
  reducers: {
    addDescription(state, { payload }: PayloadAction<TDescription>) {
      state.push(payload);
    },
    removeDescription(state, { payload }: PayloadAction<number>) {
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    changeDescription(
      state,
      { payload }: PayloadAction<{ id: number; body: string }>
    ) {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index !== -1) state[index].body = payload.body;
    },
  },
});

const actions = { ...descriptionsSlice.actions };
const reducer = descriptionsSlice.reducer;

export { actions, reducer };
