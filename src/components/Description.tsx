import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { TDescription } from '../types/types';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store/ducks';
import { Form, Field } from 'react-final-form';

interface IDescriptionProps {
  data: TDescription;
}

export default function Description(props: IDescriptionProps) {
  const textTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.BaseSyntheticEvent) {
    console.log('descr', e);

    if (e.target.value.length === 0) {
      if (textTextareaRef.current) {
        textTextareaRef.current.focus();
      }
      return false;
    }
    if (e.target.value !== props.data.body && e.target.value.length !== 0) {
      dispatch(
        actions.descriptions.changeDescription({
          id: props.data.id,
          body: e.target.value,
        })
      );
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    console.log('descr', e);

    if (e.key === 'Enter') {
      // e.preventDefault();
      const targetElem = e.target as HTMLTextAreaElement;
      if (targetElem.value.length === 0) {
        if (textTextareaRef.current) {
          textTextareaRef.current.focus();
        }
        return false;
      }
      if (targetElem.value !== props.data.body) {
        dispatch(
          actions.descriptions.changeDescription({
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
    <DescriptionItem>
      <DescriptionText>{props.data.body}</DescriptionText>
      <Form
        onSubmit={(val) => val}
        initialValues={{ description: props.data.body }}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="description">
                {(props) => (
                  <DescriptionTextarea
                    ref={textTextareaRef}
                    value={props.input.value}
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
      <DescriptionDeleteBtn
        onClick={() => {
          dispatch(actions.descriptions.removeDescription(props.data.id));
        }}
      >
        X
      </DescriptionDeleteBtn>
    </DescriptionItem>
  );
}

const DescriptionItem = styled.div`
  position: relative;
  padding-right: 25px;
`;

const DescriptionDeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
const DescriptionText = styled.p`
  display: none;
`;
const DescriptionTextarea = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 14px;
  background: transparent;
  border: 1px solid transparent;
  width: 100%;
  display: block;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;
