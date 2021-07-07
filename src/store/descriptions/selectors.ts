import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectDescriptions = (state: RootState) => state.descriptions;

export const getDescriptionById = (descrId: number) =>
  createSelector(
    selectDescriptions,
    (state) => state.filter((item) => item.cardId === descrId)[0]
  );

export default {
  selectDescriptions,
  getDescriptionById,
};
