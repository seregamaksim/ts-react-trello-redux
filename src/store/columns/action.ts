import { PayloadAction } from '@reduxjs/toolkit';
import { TBoardColumn } from '../../types/types';

export const addColumn = (
  state: TBoardColumn[],
  { payload }: PayloadAction<TBoardColumn>
) => {
  state.push(payload);
};
export const removeColumn = (
  state: TBoardColumn[],
  { payload }: PayloadAction<number>
) => {
  const index = state.findIndex((item) => item.id === payload);
  if (index !== -1) state.splice(index, 1);
};
export const renameColumn = (
  state: TBoardColumn[],
  { payload }: PayloadAction<TBoardColumn>
) => {
  const index = state.findIndex((item) => item.id === payload.id);
  if (index !== -1) state[index].title = payload.title;
};

export default {
  addColumn,
  removeColumn,
  renameColumn,
};
