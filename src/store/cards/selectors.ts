import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCards = (state: RootState) => state.cards;

export const getCardsByColumnId = (columnId: number) =>
  createSelector(selectCards, (state) =>
    state.filter((item) => item.columnId === columnId)
  );

export default {
  selectCards,
  getCardsByColumnId,
};
