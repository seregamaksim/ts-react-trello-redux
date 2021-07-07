import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board';
import LoginModal from './components/LoginModal';
import ModalCard from './components/ModalCard';
import { actions, selectors } from './store/ducks';

export default function App() {
  const userName = useSelector(selectors.userName.selectUserName);
  const dataCard = useSelector(selectors.modalCard.selectDataCard);
  const dispatch = useDispatch();

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(actions.modalCard.toggleOpen());
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return (
    <>
      {!userName && <LoginModal />}

      <Board />

      {dataCard && <ModalCard dataCard={dataCard} />}
    </>
  );
}
