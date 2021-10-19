import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import RoomListModal from '../../components/common/RoomListModal';
import { getOwnRoomList } from '../../modules/room';

const RoomListModalContainer = ({ open, setOpen, onBefore, onSuccess }) => {
  const { ownRoomList } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnRoomList());
  }, [dispatch]);

  if (!open) return null;
  if (!ownRoomList) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <Modal open={open} setOpen={setOpen}>
      <RoomListModal
        ownRoomList={ownRoomList}
        setOpen={setOpen}
        onBefore={onBefore}
        onSuccess={onSuccess}
      />
    </Modal>
  );
};

export default RoomListModalContainer;
