import { createSlice } from '@reduxjs/toolkit';
import { TDescription } from '../../types/types';

import action from './action';

const initialState: TDescription[] = [];

const descriptionsSlice = createSlice({
  name: 'descriptions',
  initialState,
  reducers: action,
});

const actions = { ...descriptionsSlice.actions };
const reducer = descriptionsSlice.reducer;

export { actions, reducer };
