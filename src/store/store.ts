import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './columns/index';
import cardsReducer from './cards/index';
import commentsReducer from './comments/index';
import descriptionsReducer from './descriptions/index';

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
    cards: cardsReducer,
    comments: commentsReducer,
    descriptions: descriptionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
