import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelHome from '../../components/channel/ChannelHome';
import { getChannelData } from '../../modules/channel';
import { getRoomList } from '../../modules/room';
import { getChannelPostList } from '../../modules/post';
import qs from 'qs';
import { getChannelArchive } from '../../modules/archive';

const ChannelHomeContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { postList } = useSelector((state) => state.post);
  const { channelArchive } = useSelector((state) => state.archive);
  const { roomList } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList(channelId));
    dispatch(
      getChannelPostList({ channelId, query: qs.stringify({ type: 'All', page: 1, pageSize: 5 }) }),
    );
    dispatch(getChannelArchive({ channelId, query: qs.stringify({ page: 1, pageSize: 6 }) }));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  return (
    <ChannelHome
      channel={channel}
      postList={postList}
      roomList={roomList}
      channelArchive={channelArchive}
    />
  );
};

export default ChannelHomeContainer;
