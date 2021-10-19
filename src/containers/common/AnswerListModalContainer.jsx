import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnswerListModal from '../../components/common/AnswerListModal';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import { getAnswerList } from '../../modules/chat';

const AnswerListModalContainer = ({ roomId, open, setOpen, onBefore, onSuccess }) => {
  const { answerList } = useSelector((state) => state.chat);
  const [tempList, setTempList] = useState();
  const dispatch = useDispatch();

  const onCheckChange = (id) => {
    setTempList(
      tempList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  const handleSuccess = () => {
    let list = [];
    tempList.map((question) => {
      if (question.checked) {
        list.push('$$question\n' + question.content + '\n$$');
        question.answeringMessage.map((answer) => {
          list.push('$$answer\n' + answer.content + '\n$$');
        });
      }
    });
    setOpen(false);
    onSuccess(list);
  };

  useEffect(() => {
    setTempList(answerList?.map((item) => ({ ...item, checked: false })));
  }, [answerList]);

  useEffect(() => {
    if (roomId) {
      dispatch(getAnswerList(roomId));
    }
  }, [dispatch, roomId]);

  if (!open) return null;
  if (!tempList) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <Modal open={open} setOpen={setOpen}>
      <AnswerListModal
        tempList={tempList}
        onCheckChange={onCheckChange}
        setOpen={setOpen}
        onBefore={onBefore}
        handleSuccess={handleSuccess}
      />
    </Modal>
  );
};

export default AnswerListModalContainer;
