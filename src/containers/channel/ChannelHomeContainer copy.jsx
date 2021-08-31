import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelHome from '../../components/channel/ChannelHome';
import { getChannelData } from '../../modules/channel';

const ChannelHomeContainer = ({ channelId, ChatListComponent }) => {
  const { channel } = useSelector((state) => state.channel);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getChannelData(channelId));
  // }, [dispatch, channelId]);

  // if (!channel) return '로딩중';

  return (
    <ChannelHome channel={channel} ChatListComponent={ChatListComponent} />
  );
};

export default ChannelHomeContainer;
