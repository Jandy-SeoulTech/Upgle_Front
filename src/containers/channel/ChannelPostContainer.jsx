import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData, getChannelPost } from '../../modules/channel';
import ChannelPost from './../../components/channel/ChannelPost';

const ChannelPostContainer = ({ channelId, postId }) => {
  const { channel, post } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelData(channelId));
    dispatch(getChannelPost(postId));
  }, [dispatch, channelId]);

  if (!channel || !post) return '로딩중';

  return <ChannelPost post={post} channel={channel} user={user} />;
};

export default ChannelPostContainer;
