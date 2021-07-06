import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { TDescription } from '../types/types';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeDescription, removeDescription } from '../store/descriptions';

interface IDescriptionProps {
  data: TDescription;
}

export default function Description(props: IDescriptionProps) {
  const [newDescrVal, setNewDescrVal] = useState(props.data.body);
  const textTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  function onBlurHandler(e: React.SyntheticEvent) {
    if (newDescrVal.length === 0) {
      if (textTextareaRef.current) {
        textTextareaRef.current.focus();
      }
      return false;
    }
    if (newDescrVal !== props.data.body && newDescrVal.length !== 0) {
      dispatch(changeDescription({ id: props.data.id, body: newDescrVal }));
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      // e.preventDefault();
      if (newDescrVal.length === 0) {
        if (textTextareaRef.current) {
          textTextareaRef.current.focus();
        }
        return false;
      }
      if (newDescrVal !== props.data.body) {
        dispatch(changeDescription({ id: props.data.id, body: newDescrVal }));
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
      <DescriptionTextarea
        ref={textTextareaRef}
        value={newDescrVal}
        onChange={(e) => setNewDescrVal(e.target.value)}
        onBlur={onBlurHandler}
        onKeyPress={onKeyHandler}
      />
      <DescriptionDeleteBtn
        onClick={() => {
          dispatch(removeDescription(props.data.id));
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
