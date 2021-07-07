import { createSlice } from '@reduxjs/toolkit';
import action from './action';

export interface IUserName {
  name: string;
}
const initialState: IUserName = {
  name: '',
};

const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: action,
});

const actions = { ...userNameSlice.actions };
const reducer = userNameSlice.reducer;

export { actions, reducer };
