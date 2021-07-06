import React, { useState } from 'react';
import styled from 'styled-components';
import BoardColumnCard from './BoardColumnCard';
import BoardColumnTitle from './BoardColumnTitle';
import { TBoardColumn, TCard, TComment } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { removeColumn } from '../store/columns';
import { getCardsByColumnId, addCard } from '../store/cards';

interface IBoardColumnProps {
  data: TBoardColumn;
  openModal: (arg: boolean) => void;
  setDataCardModal: (data: TCard) => void;
  className?: string;
}

export default function BoardColumn(props: IBoardColumnProps) {
  const cardsCurrentColumn = useSelector(getCardsByColumnId(props.data.id));
  const [newCardValue, setNewCardValue] = useState('');
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const dispatch = useDispatch();

  function addNewCard(e: React.SyntheticEvent): void {
    e.preventDefault();
    if (newCardValue.length > 0) {
      dispatch(
        addCard({
          id: Date.now(),
          title: newCardValue,
          columnId: props.data.id,
        })
      );
      setNewCardValue('');
      setIsAddCardPopupOpen(false);
    }
  }

  return (
    <BoardColumnItem className={props.className}>
      <div>
        <BoardColumnHeader>
          <BoardColumnTitle data={props.data} />
          <button onClick={() => dispatch(removeColumn(props.data.id))}>
            X
          </button>
        </BoardColumnHeader>
        <BoardColumnCardsList>
          {cardsCurrentColumn.map((item) => (
            <StyledBoardColumnCard
              key={item.id}
              data={item}
              openModal={props.openModal}
              setDataCardModal={props.setDataCardModal}
            />
          ))}
        </BoardColumnCardsList>
        <footer>
          {!isAddCardPopupOpen && (
            <button onClick={() => setIsAddCardPopupOpen(true)}>
              Add one more card
            </button>
          )}
          {isAddCardPopupOpen && (
            <div>
              <form onSubmit={addNewCard}>
                <BoardColumnFormInput
                  type="text"
                  name="card-title"
                  value={newCardValue}
                  placeholder="Enter card title"
                  onChange={(e) => setNewCardValue(e.target.value)}
                />
                <button>Add</button>
                <button
                  type="button"
                  onClick={() => setIsAddCardPopupOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </footer>
      </div>
    </BoardColumnItem>
  );
}

const BoardColumnItem = styled.li`
  padding: 10px;
  background-color: var(--lightgray);
`;
const BoardColumnHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--lightgray2);
  margin-bottom: 10px;
`;

const BoardColumnFormInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;
const BoardColumnCardsList = styled.ul`
  margin-bottom: 10px;
`;
const StyledBoardColumnCard = styled(BoardColumnCard)`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;
