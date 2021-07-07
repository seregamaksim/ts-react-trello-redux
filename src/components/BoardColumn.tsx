import { useState } from 'react';
import styled from 'styled-components';
import BoardColumnCard from './BoardColumnCard';
import BoardColumnTitle from './BoardColumnTitle';
import { IFormParams, TBoardColumn } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store/ducks';
import { Form, Field } from 'react-final-form';
import isEmpty from '../helpers/isEmpty';

interface IBoardColumnProps {
  data: TBoardColumn;
  className?: string;
}
interface IFormVal {
  cardTitle: string;
}
export default function BoardColumn(props: IBoardColumnProps) {
  const cardsCurrentColumn = useSelector(
    selectors.cards.getCardsByColumnId(props.data.id)
  );
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const dispatch = useDispatch();

  function addNewCard(val: IFormVal, form: IFormParams): void {
    if (!isEmpty(val)) {
      if (val.cardTitle.length > 0) {
        dispatch(
          actions.cards.addCard({
            id: Date.now(),
            title: val.cardTitle,
            columnId: props.data.id,
          })
        );
        setIsAddCardPopupOpen(false);
        form.reset();
      }
    }
  }

  return (
    <BoardColumnItem className={props.className}>
      <div>
        <BoardColumnHeader>
          <BoardColumnTitle data={props.data} />
          <button
            onClick={() =>
              dispatch(actions.columns.removeColumn(props.data.id))
            }
          >
            X
          </button>
        </BoardColumnHeader>
        <BoardColumnCardsList>
          {cardsCurrentColumn.map((item) => (
            <StyledBoardColumnCard key={item.id} data={item} />
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
              <Form
                onSubmit={addNewCard}
                render={({ handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Field type="text" name="cardTitle">
                        {(props) => (
                          <BoardColumnFormInput
                            {...props.input}
                            placeholder="Enter card title"
                          />
                        )}
                      </Field>

                      <button type="submit">Add</button>
                      <button
                        type="button"
                        onClick={() => setIsAddCardPopupOpen(false)}
                      >
                        Close
                      </button>
                    </form>
                  );
                }}
              />
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
