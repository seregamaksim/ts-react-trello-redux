import { useRef, useState } from 'react';
import styled from 'styled-components';
import { TBoardColumn } from '../types/types';
import TextareaAutosize from 'react-textarea-autosize';
import { renameColumn } from '../store/columns/index';
import { useDispatch } from 'react-redux';

interface IBoardColumnTitleProps {
  data: TBoardColumn;
}

export default function BoardColumnTitle(props: IBoardColumnTitleProps) {
  const [newColumnTitle, setNewColumnTitle] = useState(props.data.title);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.SyntheticEvent) {
    if (newColumnTitle.length === 0) {
      if (titleTextareaRef.current) {
        titleTextareaRef.current.focus();
      }
      return false;
    }
    if (newColumnTitle !== props.data.title && newColumnTitle.length !== 0) {
      dispatch(renameColumn({ id: props.data.id, title: newColumnTitle }));
    }
  }
  function onKeyHandler(e: React.KeyboardEvent): void | false {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newColumnTitle.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (newColumnTitle !== props.data.title) {
        dispatch(renameColumn({ id: props.data.id, title: newColumnTitle }));
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      } else {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      }
    }
  }

  return (
    <>
      <StyledBoardColumnTitle>{props.data.title}</StyledBoardColumnTitle>
      <BoardColumnTitleInput
        value={newColumnTitle}
        rows={1}
        spellCheck="false"
        ref={titleTextareaRef}
        onChange={(e) => setNewColumnTitle(e.target.value)}
        onBlur={onBlurHandler}
        onKeyPress={onKeyHandler}
      />
    </>
  );
}

const StyledBoardColumnTitle = styled.h2`
  display: none;
`;
const BoardColumnTitleInput = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  background: transparent;
  border: 0;
  resize: none;
  border: 1px solid transparent;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;
