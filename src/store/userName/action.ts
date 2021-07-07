import { PayloadAction } from '@reduxjs/toolkit';
import { IUserName } from './slice';

export const addUserName = (
  state: IUserName,
  { payload }: PayloadAction<string>
) => {
  state.name = payload;
};
export default {
  addUserName,
};
