import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
import styled from 'styled-components';
import { TBoardColumn, TCard, TComment } from '../types/types';
import { useSelector } from 'react-redux';
import { selectColumns } from '../store/columns';

interface IBoardProps {
  openModal: (arg: boolean) => void;
  setDataCard: (data: TCard) => void;
}

export default function Board(props: IBoardProps) {
  const boardColumns = useSelector(selectColumns);
  return (
    <BoardWrap>
      <BoardColumns>
        {boardColumns &&
          boardColumns.map((item) => {
            return (
              <StyledBoardColumn
                key={item.id}
                data={item}
                openModal={props.openModal}
                setDataCardModal={props.setDataCard}
              />
            );
          })}
      </BoardColumns>

      <AddColumnBtn />
    </BoardWrap>
  );
}

const BoardWrap = styled.div`
  display: flex;
  padding: 15px;
`;
const BoardColumns = styled.ul`
  display: flex;
  align-items: flex-start;
  margin-right: 15px;
  &:empty {
    margin-right: 0;
  }
`;
const StyledBoardColumn = styled(BoardColumn)`
  min-width: 270px;
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;
