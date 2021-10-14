import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyChannel from '../../components/channel/MyChannel';
import { getMychannel } from '../../modules/channel';
import { closeRoom, exitRoom } from '../../modules/room';

const MyChannelContainer = () => {
  const { myChannel } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onExitRoom = async (roomId) => {
    await dispatch(exitRoom(roomId));
    dispatch(getMychannel());
  };

  const onCloseRoom = async (roomId) => {
    await dispatch(closeRoom(roomId));
    dispatch(getMychannel());
  };

  const onGetMychannel = () => {
    dispatch(getMychannel());
  };

  useEffect(() => {
    onGetMychannel();
  }, [dispatch]);

  if (!myChannel) return '로딩중';

  return (
    <MyChannel
      user={user}
      ownerRoom={myChannel.ownerRoom}
      participantRoom={myChannel.participantRoom}
      adminChannel={myChannel.adminChannel}
      participantChannel={myChannel.participantChannel}
      onGetMychannel={onGetMychannel}
      onExitRoom={onExitRoom}
      onCloseRoom={onCloseRoom}
    />
  );
};

export default MyChannelContainer;
