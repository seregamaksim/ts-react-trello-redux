import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectComments = (state: RootState) => state.comments;

export const getCommentsById = (cardId: number) =>
  createSelector(selectComments, (state) =>
    state.filter((item) => item.cardId === cardId)
  );

export default {
  selectComments,
  getCommentsById,
};
