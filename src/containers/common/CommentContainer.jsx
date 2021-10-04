import React, { useEffect } from 'react';
import Comment from '../../components/common/Comment';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/common/Loading';

const CommentContainer = ({ channelId, postId }) => {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  if (!comment) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return <Comment />;
};

export default CommentContainer;
