import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';

interface ILoginModalProps {
  setUserName: (val: string) => void;
}
interface IFormValues {
  userName: string;
}
interface IFormParams {
  reset: () => void;
}
export default function LoginModal(props: ILoginModalProps) {
  // const [inputNameVal, setInputNameVal] = useState<string>('');

  function submitForm(e: IFormValues, form: IFormParams): void {
    // e.preventDefault();
    props.setUserName(e.userName);
    localStorage.setItem('userName', e.userName);
    // setInputNameVal('');
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
