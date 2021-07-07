import { useRef } from 'react';
import styled from 'styled-components';
import { TBoardColumn } from '../types/types';
import TextareaAutosize from 'react-textarea-autosize';
import { actions } from '../store/ducks';
import { useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';

interface IBoardColumnTitleProps {
  data: TBoardColumn;
}

export default function BoardColumnTitle(props: IBoardColumnTitleProps) {
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.BaseSyntheticEvent) {
    if (e.target.value.length === 0) {
      if (titleTextareaRef.current) {
        titleTextareaRef.current.focus();
      }
      return false;
    }
    if (e.target.value !== props.data.title && e.target.value.length !== 0) {
      dispatch(
        actions.columns.renameColumn({
          id: props.data.id,
          title: e.target.value,
        })
      );
    }
  }
  function onKeyHandler(e: React.KeyboardEvent): void | false {
    if (e.key === 'Enter') {
      e.preventDefault();
      const targetElem = e.target as HTMLTextAreaElement;

      if (targetElem.value.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (targetElem.value !== props.data.title) {
        dispatch(
          actions.columns.renameColumn({
            id: props.data.id,
            title: targetElem.value,
          })
        );
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
      <Form
        onSubmit={(val) => val}
        initialValues={{ columnTitle: props.data.title }}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="columnTitle">
                {(props) => (
                  <BoardColumnTitleInput
                    value={props.input.value}
                    spellCheck="false"
                    ref={titleTextareaRef}
                    onChange={(e) => props.input.onChange(e.target.value)}
                    onBlur={onBlurHandler}
                    onKeyPress={onKeyHandler}
                  />
                )}
              </Field>
            </form>
          );
        }}
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
