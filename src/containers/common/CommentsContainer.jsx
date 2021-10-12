import React, { useEffect } from 'react';
import Comments from '../../components/common/Comments';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteComment,
  editComment,
  getComments,
  initComment,
  writeComment,
} from '../../modules/comment';

const CommentsContainer = ({ channelId, postId }) => {
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

  const onEditComment = async ({ commentId, content }) => {
    await dispatch(editComment({ commentId, content }));
    refreshComments();
  };

  const refreshComments = () => {
    dispatch(getComments(postId));
  };

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initComment());
    };
  }, []);

  return (
    <Comments
      user={user}
      comments={comments}
      onWriteComment={onWriteComment}
      onDeleteComment={onDeleteComment}
      onEditComment={onEditComment}
    />
  );
};

export default CommentsContainer;
