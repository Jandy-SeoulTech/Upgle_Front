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

const CommentsContainer = ({ type, channelId, postOrArchiveId }) => {
  const { user } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const onWriteComment = async ({ content }) => {
    await dispatch(writeComment({ type, channelId, postOrArchiveId, content }));
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
    dispatch(getComments({ type, postOrArchiveId }));
  };

  useEffect(() => {
    refreshComments();
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
