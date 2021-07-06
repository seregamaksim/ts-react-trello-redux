import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TComment } from '../../types/types';
import { RootState } from '../store';

const initialState: TComment[] = [];

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<TComment>) {
      state.push(payload);
    },
    removeComment(state, { payload }: PayloadAction<number>) {
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    changeComment(
      state,
      { payload }: PayloadAction<{ id: number; body: string }>
    ) {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index !== -1) state[index].body = payload.body;
    },
  },
});

export const { addComment, removeComment, changeComment } =
  commentSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export const getCommentsById = (cardId: number) =>
  createSelector(selectComments, (state) =>
    state.filter((item) => item.cardId === cardId)
  );

export default commentSlice.reducer;
