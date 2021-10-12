import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelHome from '../../components/channel/ChannelHome';
import { getChannelData } from '../../modules/channel';
import { getRoomList } from '../../modules/room';
import { getChannelPostList } from '../../modules/post';
import qs from 'qs';

const ChannelHomeContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { postList } = useSelector((state) => state.post);
  const { roomList } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList(channelId));
    dispatch(getChannelPostList(channelId, qs.stringify({ type: 'All', page: 1, pageSize: 5 })));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  return <ChannelHome channel={channel} postList={postList} roomList={roomList} />;
};

export default ChannelHomeContainer;
