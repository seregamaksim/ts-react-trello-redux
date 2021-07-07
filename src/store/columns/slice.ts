import { createSlice } from '@reduxjs/toolkit';
import action from './action';
import { TBoardColumn } from '../../types/types';

const initialState: TBoardColumn[] = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: action,
});

const actions = { ...columnsSlice.actions };
const reducer = columnsSlice.reducer;

export { actions, reducer };
