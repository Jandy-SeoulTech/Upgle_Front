import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import { getChannelPostList } from '../../modules/post';
import ChannelPostList from './../../components/channel/ChannelPostList';

const ChannelPostListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { postList } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelPostList(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  return <ChannelPostList postList={postList} channel={channel} />;
};

export default ChannelPostListContainer;
