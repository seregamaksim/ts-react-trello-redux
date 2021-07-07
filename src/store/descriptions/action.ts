import { PayloadAction } from '@reduxjs/toolkit';
import { TDescription } from '../../types/types';

export const addDescription = (
  state: TDescription[],
  { payload }: PayloadAction<TDescription>
) => {
  state.push(payload);
};
export const removeDescription = (
  state: TDescription[],
  { payload }: PayloadAction<number>
) => {
  const index = state.findIndex((item) => item.id === payload);
  if (index !== -1) state.splice(index, 1);
};
export const changeDescription = (
  state: TDescription[],
  { payload }: PayloadAction<{ id: number; body: string }>
) => {
  const index = state.findIndex((item) => item.id === payload.id);
  if (index !== -1) state[index].body = payload.body;
};

export default {
  addDescription,
  removeDescription,
  changeDescription,
};
