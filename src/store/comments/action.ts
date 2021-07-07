import { PayloadAction } from '@reduxjs/toolkit';
import { TComment } from '../../types/types';

export const addComment = (
  state: TComment[],
  { payload }: PayloadAction<TComment>
) => {
  state.push(payload);
};
export const removeComment = (
  state: TComment[],
  { payload }: PayloadAction<number>
) => {
  const index = state.findIndex((item) => item.id === payload);
  if (index !== -1) state.splice(index, 1);
};
export const changeComment = (
  state: TComment[],
  { payload }: PayloadAction<{ id: number; body: string }>
) => {
  const index = state.findIndex((item) => item.id === payload.id);
  if (index !== -1) state[index].body = payload.body;
};

export default {
  addComment,
  removeComment,
  changeComment,
};
