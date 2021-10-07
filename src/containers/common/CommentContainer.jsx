import React, { useEffect } from 'react';
import Comment from '../../components/common/Comment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, getComments, initComment, writeComment } from '../../modules/comment';

const CommentContainer = ({ channelId, postId }) => {
  const { user } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const onWriteComment = async ({ content }) => {
    await dispatch(writeComment({ channelId, postId, content }));
    refreshComments();
  };

  const onDeleteComment = async ({ commentId }) => {
    const yes = window.confirm('작성하신 댓글을 삭제하시겠습니까?');
    if (yes) {
      await dispatch(deleteComment({ commentId }));
      refreshComments();
    }
  };

  const refreshComments = () => {
    dispatch(getComments({ postId }));
  };

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initComment());
    };
  }, []);

  return (
    <Comment
      user={user}
      comments={comments}
      onWriteComment={onWriteComment}
      onDeleteComment={onDeleteComment}
    />
  );
};

export default CommentContainer;
