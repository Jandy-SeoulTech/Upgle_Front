import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import MyChannel from '../../components/channel/MyChannel';
import { getMychannel } from '../../modules/channel';
import { closeRoom, exitRoom } from '../../modules/room';
import { setArchive } from '../../modules/write';

const MyChannelContainer = () => {
  const { myChannel } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onExitRoom = async (roomId) => {
    await dispatch(exitRoom(roomId));
    dispatch(getMychannel());
  };

  const onCloseRoom = async (roomId) => {
    await dispatch(closeRoom(roomId));
    dispatch(getMychannel());
  };

  const onCreateRoomArchive = async ({ room, content }) => {
    await dispatch(
      setArchive({
        archiveId: null,
        channelId: room.channelId,
        postId: room.postId,
        title: null,
        status: 'Public',
        content: content,
        tags: [],
        images: null,
      }),
    );
    history.push(`/channel/${room.channelId}/editArchive`);
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
      onCreateRoomArchive={onCreateRoomArchive}
    />
  );
};

export default MyChannelContainer;
