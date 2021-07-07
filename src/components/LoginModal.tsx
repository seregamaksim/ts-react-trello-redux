import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { actions } from '../store/ducks';
import { IFormParams } from '../types/types';

interface ILoginModalProps {}
interface IFormValues {
  userName: string;
}
export default function LoginModal(props: ILoginModalProps) {
  const dispatch = useDispatch();
  function submitForm(val: IFormValues, form: IFormParams): void {
    dispatch(actions.userName.addUserName(val.userName));
    form.reset();
  }
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        activeModal?.classList.remove('active');
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);
  return (
    <div className="modal active">
      <div className="modal__wrapper">
        <Form
          onSubmit={submitForm}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  component="input"
                  type="text"
                  name="userName"
                  placeholder="Enter your name"
                />
                <button type="submit">Submit</button>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
}
