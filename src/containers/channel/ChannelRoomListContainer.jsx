import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelRoomList from '../../components/channel/ChannelRoomList';
import Loading from '../../components/common/Loading';
import { getChannelData } from '../../modules/channel';
import { getRoomList } from '../../modules/room';

const ChannelRoomListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { roomList } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel || !roomList)
    return <Loading css={{ marginTop: '8.4375rem', backgroundColor: '#fafafc' }} />;

  return <ChannelRoomList roomList={roomList} />;
};
export default ChannelRoomListContainer;
