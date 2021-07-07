import { createSlice } from '@reduxjs/toolkit';
import { TComment } from '../../types/types';
import action from './action';

const initialState: TComment[] = [];

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: action,
});

const actions = { ...commentSlice.actions };
const reducer = commentSlice.reducer;

export { actions, reducer };
