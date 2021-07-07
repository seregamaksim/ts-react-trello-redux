import React, { useRef } from 'react';
import styled from 'styled-components';
import { TCard } from '../types/types';
import TextareaAutosize from 'react-textarea-autosize';
import { actions } from '../store/ducks';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';

interface IModalCardTitleProps {
  dataCard: TCard;
}

export default function ModalCardTitle(props: IModalCardTitleProps) {
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.BaseSyntheticEvent) {
    if (e.target.value.length === 0) {
      if (titleTextareaRef.current) {
        titleTextareaRef.current.focus();
      }
      return false;
    }
    if (
      e.target.value !== props.dataCard.title &&
      e.target.value.length !== 0
    ) {
      dispatch(
        actions.cards.renameCard({
          id: props.dataCard.id,
          title: e.target.value,
        })
      );
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const targetElem = e.target as HTMLTextAreaElement;
      if (targetElem.value.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (targetElem.value !== props.dataCard.title) {
        dispatch(
          actions.cards.renameCard({
            id: props.dataCard.id,
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
      <StyledModalCardTitle>{props.dataCard.title}</StyledModalCardTitle>
      <Form
        onSubmit={(val) => val}
        initialValues={{ cardTitle: props.dataCard.title }}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="cardTitle">
                {(props) => (
                  <ModalCardTitleTextarea
                    spellCheck="false"
                    value={props.input.value}
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

const StyledModalCardTitle = styled.h2`
  display: none;
`;
const ModalCardTitleTextarea = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  background: transparent;
  resize: none;
  border: 1px solid transparent;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;
