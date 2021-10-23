import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import { deletePost, getPost, initPost } from '../../modules/post';
import Post from '../../components/post/Post';
import Loading from '../../components/common/Loading';
import { setPost } from '../../modules/write';
import { useHistory } from 'react-router';
import { concatImage } from '../../modules/image';

const PostContainer = ({ channelId, postId }) => {
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();

  const onEditPost = async () => {
    await dispatch(setPost(post));
    await dispatch(concatImage(post.images.map((image) => image.src)));
    history.push(`/channel/${channelId}/editPost`);
  };

  const onDeletePost = async () => {
    await dispatch(deletePost({ postId, channelId }));
    history.push(`/channel/${channelId}/post`);
  };

  useEffect(() => {
    dispatch(getChannelData(channelId));
    dispatch(getPost(postId));
  }, [dispatch, channelId]);

  useEffect(() => {
    return () => {
      dispatch(initPost());
    };
  }, []);

  if (!channel || !post) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <Post
      userId={user.id}
      post={post}
      channel={channel}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
    />
  );
};

export default PostContainer;
