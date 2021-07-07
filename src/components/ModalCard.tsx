import styled from 'styled-components';
import { IFormParams, TCard } from '../types/types';
import ModalCardTitle from './ModalCardTitle';
import Comment from './Comment';
import Description from './Description';
import AddForm from './AddForm';
import isEmpty from '../helpers/isEmpty';
import { getColumnById } from '../store/columns/selectors';
import { actions, selectors } from '../store/ducks';
import { useDispatch, useSelector } from 'react-redux';

interface IModalCardProps {
  dataCard: TCard;
}
interface IModalProps {
  $isOpen: boolean;
}
export interface ISubmitValues {
  textarea: string;
}
export default function ModalCard(props: IModalCardProps) {
  const openModal = useSelector(selectors.modalCard.selectIsOpen);
  const dispatch = useDispatch();
  const comments = useSelector(
    selectors.comments.getCommentsById(props.dataCard.id)
  );
  const description = useSelector(
    selectors.descriptions.getDescriptionById(props.dataCard.id)
  );
  const columnInfo = useSelector(getColumnById(props.dataCard.columnId));
  const userName = useSelector(selectors.userName.selectUserName);
  function submitComment(val: ISubmitValues, form: IFormParams) {
    if (!isEmpty(val)) {
      if (val.textarea.trim().length > 0) {
        if (props.dataCard) {
          dispatch(
            actions.comments.addComment({
              id: Date.now(),
              body: val.textarea,
              cardId: props.dataCard.id,
            })
          );
        }
        form.reset();
      }
    }
  }
  function submitDescription(val: ISubmitValues, form: IFormParams) {
    if (!isEmpty(val)) {
      if (val.textarea.trim().length > 0) {
        if (props.dataCard) {
          dispatch(
            actions.descriptions.addDescription({
              id: Date.now(),
              body: val.textarea,
              cardId: props.dataCard.id,
            })
          );
        }
        form.reset();
      }
    }
  }
  return (
    <Modal $isOpen={openModal}>
      <div className="modal__wrapper">
        {props.dataCard && (
          <div>
            <div>
              <ModalCardTitle dataCard={props.dataCard} />
              <p>{`Inside a column ${columnInfo.title}`}</p>
              <ModalCardAuthor>
                Author: <span>{userName}</span>
              </ModalCardAuthor>
              <ModalCardCloseBtn
                onClick={() => {
                  document.body.style.overflow = '';
                  dispatch(actions.modalCard.toggleOpen());
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
                  return <StyledComment key={item.id} data={item} />;
                })}
              </CommentsList>
              <AddForm
                submitHandler={submitComment}
                buttonValue="Add comment"
              />
            </div>
          </div>
        )}
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
