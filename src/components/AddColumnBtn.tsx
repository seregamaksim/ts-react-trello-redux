import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addColumn } from '../store/columns';
import { Field, Form } from 'react-final-form';
import { FormApi } from 'final-form';

interface IAddColumnProps {}

interface IFormAddColumnValues {
  columnTitle: string;
}
export default function AddColumnBtn(props: IAddColumnProps) {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const dispatch = useDispatch();

  function addNewColumn(
    e: IFormAddColumnValues,
    form: { reset: () => void }
  ): void {
    if (e.columnTitle.length > 0) {
      dispatch(addColumn({ id: Date.now(), title: e.columnTitle }));
      form.reset();
    }
  }

  return (
    <AddColumnWrapper>
      <AddColumnButton
        onClick={() => {
          setIsOpenPopup(true);
        }}
      >
        Add one more column
      </AddColumnButton>
      {isOpenPopup && (
        <AddColumnPopup isOpenPopup={isOpenPopup}>
          <AddColumnPopupClose
            onClick={() => {
              setIsOpenPopup(false);
            }}
          >
            X
          </AddColumnPopupClose>
          <Form
            onSubmit={addNewColumn}
            render={({ handleSubmit }) => {
              return (
                <AddColumnPopupForm onSubmit={handleSubmit}>
                  <AddColumnPopupInput
                    type="text"
                    name="columnTitle"
                    placeholder="Enter column name"
                    component="input"
                  />
                  <AddColumnPopupBtn type="submit">
                    Add column
                  </AddColumnPopupBtn>
                </AddColumnPopupForm>
              );
            }}
          />
        </AddColumnPopup>
      )}
    </AddColumnWrapper>
  );
}

const AddColumnWrapper = styled.div`
  position: relative;
`;
const AddColumnButton = styled.button`
  min-width: 270px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
  border: 0;
  background-color: var(--lightblue);
  cursor: pointer;
`;
const AddColumnPopup = styled.div<{ isOpenPopup: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 25px 10px 10px;
  background-color: var(--lightgray);
  min-width: 270px;
  display: ${(props) => (props.isOpenPopup ? 'block' : 'none')};
`;
const AddColumnPopupClose = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background: none;
  border: 0;
  cursor: pointer;
`;
const AddColumnPopupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AddColumnPopupInput = styled(Field)`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 3px 5px;
`;
const AddColumnPopupBtn = styled.button`
  background-color: var(--lightblue);
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--white);
`;
