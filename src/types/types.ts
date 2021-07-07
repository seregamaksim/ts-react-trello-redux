export type TBoardColumn = {
  id: number;
  title: string;
};

export type TCard = {
  id: number;
  title: string;
  columnId: number;
};
export type TComment = {
  id: number;
  body: string;
  cardId: number;
};
export type TDescription = {
  id: number;
  body: string;
  cardId: number;
};
export enum LOCALSTORAGE_KEYS {
  userName = 'userName',
  boardColumns = 'boardColumns',
  descriptions = 'descriptions',
  comments = 'comments',
}

export interface IFormParams {
  reset: () => void;
}
