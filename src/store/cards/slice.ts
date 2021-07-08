import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

const initialState: TCard[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, { payload }: PayloadAction<TCard>): void {
      state.push(payload);
    },
    removeCard(state, { payload }: PayloadAction<number>): void {
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    renameCard(
      state,
      { payload }: PayloadAction<{ id: number; title: string }>
    ) {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index !== -1) state[index].title = payload.title;
    },
  },
});

const actions = { ...cardsSlice.actions };
const reducer = cardsSlice.reducer;

export { actions, reducer };
