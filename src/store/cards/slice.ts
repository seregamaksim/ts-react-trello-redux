import { createSlice } from '@reduxjs/toolkit';
import action from './action';
import { TCard } from '../../types/types';

const initialState: TCard[] = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: action,
});

const actions = { ...cardsSlice.actions };
const reducer = cardsSlice.reducer;

export { actions, reducer };
