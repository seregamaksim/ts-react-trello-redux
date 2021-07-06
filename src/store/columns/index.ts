import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { addColumn, removeColumn } from './actions';
import { TBoardColumn } from '../../types/types';
import { RootState } from '../store';

const initialState: TBoardColumn[] = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn(state, { payload }: PayloadAction<TBoardColumn>): void {
      state.push(payload);
    },
    removeColumn(state, { payload }: PayloadAction<number>): void {
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    renameColumn(state, { payload }: PayloadAction<TBoardColumn>) {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index !== -1) state[index].title = payload.title;
    },
  },
});

export const { addColumn, removeColumn, renameColumn } = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columns;

export const getColumnById = (columnId: number) =>
  createSelector(
    selectColumns,
    (state) => state.filter((item) => item.id === columnId)[0]
  );

export default columnsSlice.reducer;
