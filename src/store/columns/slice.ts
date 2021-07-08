import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  reducers: {
    addColumn(state, { payload }: PayloadAction<TBoardColumn>) {
      state.push(payload);
    },
    removeColumn(state, { payload }: PayloadAction<number>) {
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
    renameColumn(state, { payload }: PayloadAction<TBoardColumn>) {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index !== -1) state[index].title = payload.title;
    },
  },
});

const actions = { ...columnsSlice.actions };
const reducer = columnsSlice.reducer;

export { actions, reducer };
