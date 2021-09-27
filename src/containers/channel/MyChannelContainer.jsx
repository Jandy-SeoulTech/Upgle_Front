import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import MyChannel from '../../components/channel/MyChannel';
import { getMychannel } from '../../modules/channel';
import { closeRoom, exitRoom } from '../../modules/room';

const MyChannelContainer = () => {
  const { myChannel } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  const handleExitRoom = async ({ roomId }) => {
    await dispatch(exitRoom({ roomId }));
    dispatch(getMychannel());
  };

  const handleCloseRoom = async ({ roomId }) => {
    await dispatch(closeRoom({ roomId }));
    dispatch(getMychannel());
  };

  useEffect(() => {
    dispatch(getMychannel());
  }, [dispatch]);

  if (!myChannel) return '로딩중';

  return (
    <MyChannel
      ownerRoom={myChannel.ownerRoom}
      participantRoom={myChannel.participantRoom}
      adminChannel={myChannel.adminChannel}
      participantChannel={myChannel.participantChannel}
      handleExitRoom={handleExitRoom}
      handleCloseRoom={handleCloseRoom}
    />
  );
};

export default MyChannelContainer;
