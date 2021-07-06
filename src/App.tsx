import { useEffect, useState } from 'react';
import Board from './components/Board';
import LoginModal from './components/LoginModal';
import ModalCard from './components/ModalCard';

// export type TBoardColumn = {
//   id: number;
//   title: string;
// };

export type TCard = {
  id: number;
  title: string;
  columnId: number;
};
export type TComment = {
  id: number;
  body: string;
  cardId: number;
};
export type TDescription = {
  id: number;
  body: string;
  cardId: number;
};
enum LOCALSTORAGE_KEYS {
  userName = 'userName',
  boardColumns = 'boardColumns',
  descriptions = 'descriptions',
  comments = 'comments',
}

// const initialStateColumns = [
//   { id: 0, title: 'TODO' },
//   { id: 1, title: 'In Progress' },
//   { id: 2, title: 'Testing' },
//   { id: 3, title: 'Done' },
// ];

export default function App() {
  const [userName, setUserName] = useState('');
  const localUserName =
    localStorage.getItem(LOCALSTORAGE_KEYS.userName) || userName;
  // const localBoardColumns = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEYS.boardColumns) || '[]'
  // );
  // const localCards = JSON.parse(localStorage.getItem('cards') || '[]');
  // const localDescriptions = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEYS.descriptions) || '[]'
  // );
  // const localComments = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEYS.comments) || '[]'
  // );

  // const [boardColumns, setBoardColumns] = useState<TBoardColumn[]>(
  //   localBoardColumns.length > 0 ? localBoardColumns : initialStateColumns
  // );
  // const [cards, setCards] = useState<TCard[]>(
  //   localCards.length > 0 ? localCards : []
  // );
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [dataCard, setDataCard] = useState<TCard | null>(null);
  // const [comments, setComments] = useState<TComment[]>(
  //   localComments.length > 0 ? localComments : []
  // );
  // const [descriptions, setDescriptions] = useState<TDescription[]>(
  //   localDescriptions.length > 0 ? localDescriptions : []
  // );

  // localStorage.setItem('boardColumns', JSON.stringify(boardColumns));
  // localStorage.setItem('cards', JSON.stringify(cards));
  // localStorage.setItem('descriptions', JSON.stringify(descriptions));
  // localStorage.setItem('comments', JSON.stringify(comments));

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenCard(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  return (
    <>
      {!localUserName && <LoginModal setUserName={setUserName} />}

      <Board openModal={setIsOpenCard} setDataCard={setDataCard} />

      {isOpenCard && dataCard && (
        <ModalCard
          dataCard={dataCard}
          setIsOpenCard={setIsOpenCard}
          isOpen={isOpenCard}
          userName={localUserName}
        />
      )}
    </>
  );
}
