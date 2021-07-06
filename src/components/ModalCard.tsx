import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { TBoardColumn, TCard, TComment, TDescription } from '../types/types';
import ModalCardTitle from './ModalCardTitle';
import Comment from './Comment';
import Description from './Description';
import AddForm from './AddForm';
import isEmpty from '../helpers/isEmpty';
import { getColumnById } from '../store/columns';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getCommentsById } from '../store/comments';
import { addDescription, getDescriptionById } from '../store/descriptions';

interface IModalCardProps {
  dataCard: TCard;
  isOpen: boolean;
  userName: string;
  setIsOpenCard: (arg: boolean) => void;
}
interface IModalProps {
  $isOpen: boolean;
}
export interface ISubmitValues {
  textarea: string;
}
export interface ISubmitFormParams {
  reset: () => void;
}
export default function ModalCard(props: IModalCardProps) {
  // const [commentVal, setCommentVal] = useState('');
  // const [descrText, setDescrText] = useState('');
  const comments = useSelector(getCommentsById(props.dataCard.id));
  const description = useSelector(getDescriptionById(props.dataCard.id));
  const columnInfo = useSelector(getColumnById(props.dataCard.columnId));
  const dispatch = useDispatch();

  function submitComment(e: ISubmitValues, form: ISubmitFormParams) {
    if (e.textarea.length > 0) {
      if (props.dataCard) {
        dispatch(
          addComment({
            id: Date.now(),
            body: e.textarea,
            cardId: props.dataCard.id,
          })
        );
      }

      form.reset();
    }
  }
  function submitDescription(e: ISubmitValues, form: ISubmitFormParams) {
    if (e.textarea.length > 0) {
      if (props.dataCard) {
        dispatch(
          addDescription({
            id: Date.now(),
            body: e.textarea,
            cardId: props.dataCard.id,
          })
        );
      }
      form.reset();
    }
  }
  return (
    <Modal $isOpen={props.isOpen}>
      <div className="modal__wrapper">
        <div>
          <ModalCardTitle dataCard={props.dataCard} />
          <p>{`Inside a column ${columnInfo.title}`}</p>
          <ModalCardAuthor>
            Author: <span>{props.userName}</span>
          </ModalCardAuthor>
          <ModalCardCloseBtn
            onClick={() => {
              document.body.style.overflow = '';
              props.setIsOpenCard(false);
            }}
          >
            X
          </ModalCardCloseBtn>
        </div>
        <hr />
        <div>
          <ModalCardSectionTitle>Description:</ModalCardSectionTitle>
          <DescrWrapper>
            {!isEmpty(description) && <Description data={description} />}
          </DescrWrapper>
          {isEmpty(description) && (
            <AddForm
              submitHandler={submitDescription}
              buttonValue="Add description"
            />
          )}
        </div>
        <hr />
        <div>
          <ModalCardSectionTitle>Comments:</ModalCardSectionTitle>
          <CommentsList>
            {comments.map((item) => {
              return (
                <StyledComment
                  key={item.id}
                  data={item}
                  userName={props.userName}
                />
              );
            })}
          </CommentsList>
          <AddForm submitHandler={submitComment} buttonValue="Add comment" />
        </div>
      </div>
    </Modal>
  );
}

const Modal = styled.div.attrs<IModalProps>(({ $isOpen }) => ({
  className: $isOpen ? 'modal active' : 'modal',
}))<IModalProps>``;
const ModalCardCloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const CommentsList = styled.ul`
  margin-bottom: 20px;
  &:empty {
    margin-bottom: 0;
  }
`;
const ModalCardSectionTitle = styled.h4`
  margin-bottom: 15px;
`;
const StyledComment = styled(Comment)`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const ModalCardAuthor = styled.p`
  font-size: 12px;
  span {
    font-weight: bold;
  }
`;
const DescrWrapper = styled.div`
  margin-bottom: 20px;
  &:empty {
    margin-bottom: 0;
  }
`;
