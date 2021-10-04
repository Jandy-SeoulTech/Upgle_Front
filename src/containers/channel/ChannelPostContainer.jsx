import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getChannelData, getChannelPost, initPost } from '../../modules/channel';
import { createRoom } from '../../modules/room';
import ChannelPost from './../../components/channel/ChannelPost';

const ChannelPostContainer = ({ channelId, postId }) => {
  const { channel, post } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  const onCreateRoom = async ({ status, name, reservedTime }) => {
    await dispatch(createRoom({ status, name, channelId, postId, reservedTime }));
    history.push(`channel/${channelId}/chat`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelData(channelId));
    dispatch(getChannelPost(postId));
  }, [dispatch, channelId]);

  useEffect(() => {
    return () => {
      dispatch(initPost())
    }
  }, [])

  if (!channel || !post) return '로딩중';

  return <ChannelPost post={post} channel={channel} user={user} onCreateRoom={onCreateRoom} />;
};

export default ChannelPostContainer;
