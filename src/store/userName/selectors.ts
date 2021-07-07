import { RootState } from '../store';

export const selectUserName = (state: RootState) => state.userName.name;

export default {
  selectUserName,
};
