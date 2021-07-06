import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDescription } from '../../types/types';
import { RootState } from '../store';

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

export const { addDescription, removeDescription, changeDescription } =
  descriptionsSlice.actions;

export const selectDescriptions = (state: RootState) => state.descriptions;

export const getDescriptionById = (descrId: number) =>
  createSelector(
    selectDescriptions,
    (state) => state.filter((item) => item.cardId === descrId)[0]
  );

export default descriptionsSlice.reducer;
