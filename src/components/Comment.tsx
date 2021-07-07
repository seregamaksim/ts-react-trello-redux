import { useRef } from 'react';
import styled from 'styled-components';
import { TComment } from '../types/types';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store/ducks';
import { Form, Field } from 'react-final-form';

interface ICommentProps {
  data: TComment;
  className?: string;
}

export default function Comment(props: ICommentProps) {
  const textTextareaRef = useRef<HTMLTextAreaElement>(null);
  const userName = useSelector(selectors.userName.selectUserName);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.BaseSyntheticEvent) {
    if (e.target.value.length === 0) {
      if (textTextareaRef.current) {
        textTextareaRef.current.focus();
      }
      return false;
    }
    if (e.target.value !== props.data.body && e.target.value.length !== 0) {
      dispatch(
        actions.comments.changeComment({
          id: props.data.id,
          body: e.target.value,
        })
      );
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const targetElem = e.target as HTMLTextAreaElement;
      if (targetElem.value.length === 0) {
        if (textTextareaRef.current) {
          textTextareaRef.current.focus();
        }
        return false;
      }
      if (targetElem.value !== props.data.body) {
        dispatch(
          actions.comments.changeComment({
            id: props.data.id,
            body: targetElem.value,
          })
        );
        if (textTextareaRef.current) {
          textTextareaRef.current.blur();
        }
      } else {
        if (textTextareaRef.current) {
          textTextareaRef.current.blur();
        }
      }
    }
  }
  return (
    <CommentItem className={props.className}>
      <CommentText>{props.data.body}</CommentText>
      <Form
        onSubmit={(val) => val}
        initialValues={{ comment: props.data.body }}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="comment">
                {(props) => (
                  <CommentTextTextarea
                    rows={1}
                    spellCheck="false"
                    ref={textTextareaRef}
                    value={props.input.value}
                    onChange={(e) => {
                      props.input.onChange(e.target.value);
                    }}
                    onBlur={onBlurHandler}
                    onKeyPress={onKeyHandler}
                  />
                )}
              </Field>
            </form>
          );
        }}
      />

      <CommentAuthor>
        Author: <span>{userName}</span>
      </CommentAuthor>
      <CommentDeleteBtn
        onClick={() => dispatch(actions.comments.removeComment(props.data.id))}
      >
        X
      </CommentDeleteBtn>
    </CommentItem>
  );
}

const CommentItem = styled.li`
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  position: relative;
`;

const CommentText = styled.p`
  display: none;
`;
const CommentTextTextarea = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 16px;
  line-height: 1.2;
  background: transparent;
  resize: none;
  border: 1px solid transparent;
  width: 90%;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;

const CommentAuthor = styled.p`
  font-size: 12px;

  & span {
    font-weight: bold;
  }
`;

const CommentDeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
