import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/common/Modal';
import ReviewModal from '../../components/common/ReviewModal';
import { exitRoom, reviewRoom } from '../../modules/room';

const ReviewModalContainer = ({ room, open, setOpen, onSuccess }) => {
  const { userExit, reviewSuccess } = useSelector((state) => state.room);
  const [review, setReview] = useState('');
  const [rate, setRate] = useState();
  const dispatch = useDispatch();

  const handleReview = () => {
    dispatch(exitRoom({ roomId: room.id }));
  };

  useEffect(() => {
    if (userExit) {
      dispatch(
        reviewRoom({
          roomId: room.id,
          channelId: room.channelId,
          content: review,
          status: rate,
          reviewedUserId: room.roomOwner.id,
        }),
      );
    }
  }, [userExit]);

  useEffect(() => {
    if (reviewSuccess) {
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [reviewSuccess]);

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
