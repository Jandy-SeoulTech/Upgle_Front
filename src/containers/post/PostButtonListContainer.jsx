import React, { useEffect, useState } from 'react';
import PostButtonList from '../../components/post/PostButtonList';
import { useSelector, useDispatch } from 'react-redux';
import { attentionPost, unAttentionPost } from '../../modules/post';
import { createRoom } from '../../modules/room';
import { useHistory } from 'react-router';
import Loading from '../../components/common/Loading';

const PostButtonListContainer = ({ channelId, postId }) => {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onAttentionPost = (postId) => {
    dispatch(attentionPost(postId));
  };

  const onUnAttentionPost = (postId) => {
    dispatch(unAttentionPost(postId));
  };

  const onCreateRoom = async ({ status, name, reservedTime }) => {
    await dispatch(createRoom({ status, name, channelId, postId, reservedTime }));
    history.push(`/channel/${channelId}/room`);
  };

  const handleMoveChat = (roomId) => {
    window.open(`/room/${roomId}`, '_blank', 'width=600, height=900, toolbars=no, scrollbars=yes');
    return false;
  };

  useEffect(() => {
    if (post && user) {
      setIsLiked(false);
      post.attention.forEach((attention) => attention.user.id === user.id && setIsLiked(true));
    }
  }, [post, user]);

  if (!post || !post) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <PostButtonList
      post={post}
      isLiked={isLiked}
      onAttentionPost={onAttentionPost}
      onUnAttentionPost={onUnAttentionPost}
      onCreateRoom={onCreateRoom}
      handleMoveChat={handleMoveChat}
    />
  );
};

export default PostButtonListContainer;
