import { RootState } from '../store';

export const selectIsOpen = (state: RootState) => state.modalCard.isOpen;

export const selectDataCard = (state: RootState) => state.modalCard.dataCard;

export default {
  selectIsOpen,
  selectDataCard,
};
