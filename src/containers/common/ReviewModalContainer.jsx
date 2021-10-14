import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Modal from '../../components/common/Modal';
import ReviewModal from '../../components/common/ReviewModal';
import { exitRoom, reviewRoom } from '../../modules/room';

const ReviewModalContainer = ({ room, open, setOpen, onSuccess }) => {
  const [review, setReview] = useState('');
  const [rate, setRate] = useState();
  const dispatch = useDispatch();

  const handleReview = async () => {
    await dispatch(exitRoom(room.id));
    await dispatch(
      reviewRoom({
        roomId: room.id,
        channelId: room.channelId,
        content: review,
        status: rate,
        reviewedUserId: room.roomOwner.id,
      }),
    );
    setOpen(false);
    onSuccess && onSuccess();
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <ReviewModal
        room={room}
        review={review}
        setReview={setReview}
        rate={rate}
        setRate={setRate}
        handleReview={handleReview}
        setOpen={setOpen}
      />
    </Modal>
  );
};

export default ReviewModalContainer;
