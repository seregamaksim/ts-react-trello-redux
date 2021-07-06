import { FormEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';

interface IAddFormProps {
  submitHandler: (e: FormEvent) => void;
  textAreaValue: string;
  changeTextValue: (text: string) => void;
  buttonValue: string;
}

export default function AddForm(props: IAddFormProps) {
  return (
    <div>
      {/* <Form onSubmit={props.submitHandler}
        render={({handleSubmit}) => {
          return <form onSubmit={handleSubmit}>
            <AddFormTextarea
            name="textarea"
            value={props.textAreaValue}
            onChange={(e) => props.changeTextValue(e.target.value)}
          />
          <button>{props.buttonValue}</button>
          </form>
        }}
      
      /> */}
      <form onSubmit={props.submitHandler}>
        <AddFormTextarea
          value={props.textAreaValue}
          onChange={(e) => props.changeTextValue(e.target.value)}
        />
        <button>{props.buttonValue}</button>
      </form>
    </div>
  );
}

const AddFormTextarea = styled(TextareaAutosize)`
  width: 100%;
  display: block;
  margin-bottom: 10px;
  resize: none;
`;
