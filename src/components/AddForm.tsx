import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import { ISubmitFormParams, ISubmitValues } from './ModalCard';

interface IAddFormProps {
  submitHandler: (e: ISubmitValues, form: ISubmitFormParams) => void;
  buttonValue: string;
}

export default function AddForm(props: IAddFormProps) {
  return (
    <div>
      <Form
        onSubmit={props.submitHandler}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="textarea">
                {(props) => (
                  <AddFormTextarea
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  ></AddFormTextarea>
                )}
              </Field>
              <button type="submit">{props.buttonValue}</button>
            </form>
          );
        }}
      />
    </div>
  );
}

const AddFormTextarea = styled(TextareaAutosize)`
  width: 100%;
  display: block;
  margin-bottom: 10px;
  resize: none;
`;
