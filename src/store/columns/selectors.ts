import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectColumns = (state: RootState) => state.columns;

export const getColumnById = (columnId: number) =>
  createSelector(
    selectColumns,
    (state) => state.filter((item) => item.id === columnId)[0]
  );
