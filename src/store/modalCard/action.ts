import { PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';
import { IModalCardState } from './slice';

export const toggleOpen = (state: IModalCardState) => {
  state.isOpen = !state.isOpen;
};
export const setDataCard = (
  state: IModalCardState,
  { payload }: PayloadAction<TCard>
) => {
  state.dataCard = payload;
};
export default { toggleOpen, setDataCard };
