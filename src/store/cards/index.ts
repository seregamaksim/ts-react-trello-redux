import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';
import { RootState } from '../store';

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

export const { addCard, removeCard, renameCard } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards;

export const getCardsByColumnId = (columnId: number) =>
  createSelector(selectCards, (state) =>
    state.filter((item) => item.columnId === columnId)
  );

export default cardsSlice.reducer;
