import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

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
  reducers: {
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
    setDataCard(state, { payload }: PayloadAction<TCard>) {
      state.dataCard = payload;
    },
  },
});

const actions = { ...modalCardSlice.actions };
const reducer = modalCardSlice.reducer;
export { actions, reducer };
