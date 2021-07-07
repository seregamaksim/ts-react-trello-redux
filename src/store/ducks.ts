import { combineReducers } from 'redux';

import * as columns from './columns';
import * as cards from './cards';
import * as comments from './comments';
import * as descriptions from './descriptions';
import * as modalCard from './modalCard';
import * as userName from './userName';

export const reducer = combineReducers({
  columns: columns.reducer,
  cards: cards.reducer,
  comments: comments.reducer,
  descriptions: descriptions.reducer,
  modalCard: modalCard.reducer,
  userName: userName.reducer,
});

export const actions = {
  columns: columns.actions,
  cards: cards.actions,
  comments: comments.actions,
  descriptions: descriptions.actions,
  modalCard: modalCard.actions,
  userName: userName.actions,
};

export const selectors = {
  columns: columns.selectors,
  cards: cards.selectors,
  comments: comments.selectors,
  descriptions: descriptions.selectors,
  modalCard: modalCard.selectors,
  userName: userName.selectors,
};
