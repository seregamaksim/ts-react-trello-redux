import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserName {
  name: string;
}
const initialState: IUserName = {
  name: '',
};

const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    addUserName(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    },
  },
});

const actions = { ...userNameSlice.actions };
const reducer = userNameSlice.reducer;

export { actions, reducer };
