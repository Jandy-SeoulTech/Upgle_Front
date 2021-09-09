import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/common/Modal';
import ReviewModal from '../../components/common/ReviewModal';
import { reviewRoom } from '../../modules/room';

const ReviewModalContainer = ({ room, open, setOpen, onSuccess }) => {
  const { user } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const handleReview = ({ review, rate }) => {
    dispatch(
      reviewRoom({
        roomId: room.id,
        content: review,
        status: rate,
        reviewedUserId: user.id,
      }),
    );
  };

  // useEffect(() => {
  //   if (success) {
  //     onSuccess();
  //   }
  // }, [success]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <ReviewModal room={room} handleReview={handleReview} setOpen={setOpen} />
    </Modal>
  );
};

export default ReviewModalContainer;
