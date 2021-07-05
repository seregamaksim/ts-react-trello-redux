import { createSlice } from '@reduxjs/toolkit';
import { addColumn, removeColumn } from './actions';

const initialState = [{ id: 0, title: 'test' }];

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn,
    removeColumn,
  },
});

export default columnsSlice.reducer;
