import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelHome from '../../components/channel/ChannelHome';
import { getChannelData, getChannelPost, getRoomList } from '../../modules/channel';

const ChannelHomeContainer = ({ channelId }) => {
  const { channel, postList, roomList } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList({ channelId }));
    dispatch(getChannelPost(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  return <ChannelHome channel={channel} postList={postList} roomList={roomList} />;
};

export default ChannelHomeContainer;
