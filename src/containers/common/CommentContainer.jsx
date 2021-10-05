import React, { useEffect } from 'react';
import Comment from '../../components/common/Comment';
import { useSelector, useDispatch } from 'react-redux';
import { initComment, writeComment } from '../../modules/comment';
import { getPost } from '../../modules/post';

const CommentContainer = ({ channelId, postId }) => {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const onWriteComment = ({ content }) => {
    dispatch(writeComment({ channelId, postId, content }));
  };

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, comment]);

  useEffect(() => {
    return () => {
      dispatch(initComment());
    };
  }, []);

  return <Comment user={user} comments={post?.comment} onWriteComment={onWriteComment} />;
};

export default CommentContainer;
