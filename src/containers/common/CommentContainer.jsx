import React, { useEffect } from 'react';
import Comment from '../../components/common/Comment';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/common/Loading';
import { writeComment } from '../../modules/comment';

const CommentContainer = ({ channelId, postId }) => {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const onWriteComment = ({ content }) => {
    dispatch(writeComment({ channelId, postId, content }));
  };

  useEffect(() => {
    console.log(post?.comment);
  }, [dispatch]);

  // if (!comment) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return <Comment user={user} comments={post?.comment} onWriteComment={onWriteComment} />;
};

export default CommentContainer;
