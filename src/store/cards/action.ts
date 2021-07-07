import { PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

export const addCard = (
  state: TCard[],
  { payload }: PayloadAction<TCard>
): void => {
  state.push(payload);
};
export const removeCard = (
  state: TCard[],
  { payload }: PayloadAction<number>
): void => {
  const index = state.findIndex((item) => item.id === payload);
  if (index !== -1) state.splice(index, 1);
};
export const renameCard = (
  state: TCard[],
  { payload }: PayloadAction<{ id: number; title: string }>
) => {
  const index = state.findIndex((item) => item.id === payload.id);
  if (index !== -1) state[index].title = payload.title;
};

export default {
  addCard,
  removeCard,
  renameCard,
};
