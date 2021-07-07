import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectColumns } from '../store/columns/selectors';

interface IBoardProps {}

export default function Board(props: IBoardProps) {
  const boardColumns = useSelector(selectColumns);

  return (
    <BoardWrap>
      <BoardColumns>
        {boardColumns &&
          boardColumns.map((item) => (
            <StyledBoardColumn key={item.id} data={item} />
          ))}
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
