import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import MyChannel from '../../components/channel/MyChannel';
import { getMychannel } from '../../modules/channel';
import { closeRoom, exitRoom } from '../../modules/room';

const MyChannelContainer = () => {
  const { myChannel } = useSelector((state) => state.channel);
  const { success } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const handleExitRoom = ({ roomId }) => {
    dispatch(exitRoom({ roomId }));
  };

  const handleCloseRoom = ({ roomId }) => {
    dispatch(closeRoom({ roomId }));
  };

  useEffect(() => {
    if (success) {
      dispatch(getMychannel());
    }
  }, [success]);

  useEffect(() => {
    dispatch(getMychannel());
  }, [dispatch]);

  if (!myChannel) return '로딩중';

  return (
    <MyChannel
      ownerRoom={myChannel.ownerRoom}
      participantRoom={myChannel.participantRoom}
      adminChannl={myChannel.adminChannl}
      participantChannel={myChannel.participantChannel}
      handleExitRoom={handleExitRoom}
      handleCloseRoom={handleCloseRoom}
    />
  );
};

export default MyChannelContainer;
