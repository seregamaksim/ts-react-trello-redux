import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TComment } from '../../types/types';

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

const actions = { ...commentSlice.actions };
const reducer = commentSlice.reducer;

export { actions, reducer };
