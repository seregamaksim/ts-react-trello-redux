import { createSlice } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';
import action from './action';

export interface IModalCardState {
  isOpen: boolean;
  dataCard: TCard | null;
}
const initialState: IModalCardState = {
  isOpen: false,
  dataCard: null,
};

const modalCardSlice = createSlice({
  name: 'modalCard',
  initialState,
  reducers: action,
});

const actions = { ...modalCardSlice.actions };
const reducer = modalCardSlice.reducer;
export { actions, reducer };
