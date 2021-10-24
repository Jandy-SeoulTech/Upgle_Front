import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import Loading from '../../components/common/Loading';
import Archive from '../../components/archive/Archive';
import { deleteArchive, getArchive, initArchive } from '../../modules/archive';
import { setArchive } from '../../modules/write';
import { useHistory } from 'react-router';
import { concatImage } from '../../modules/image';

const ArchiveContainer = ({ channelId, archiveId }) => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const { archive } = useSelector((state) => state.archive);
  const { user } = useSelector((state) => state.user);
  const [isParticipant, setIsParticipant] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onEditArchive = async () => {
    await dispatch(setArchive(archive));
    await dispatch(concatImage(archive.images.map((image) => image.src)));
    history.push(`/channel/${channelId}/editArchive`);
  };

  const onDeleteArchive = async () => {
    await dispatch(deleteArchive(archiveId));
    history.push(`/channel/${channelId}/archive`);
  };

  useEffect(() => {
    if (channel && user) {
      channel.admin.id === user.id && setIsParticipant(true);
      channel.participants.map((participant) => {
        if (participant.userId === user.id) {
          setIsParticipant(true);
        }
      });
      setIsFinished(true);
    }
  }, [channel, user]);

  useEffect(() => {
    dispatch(getChannelData(channelId));
    dispatch(getArchive(archiveId));
  }, [dispatch, channelId, archiveId]);

  useEffect(() => {
    if (isFinished && archive) {
      if (archive.status === 'Private' && !isParticipant) {
        alert('먼저 채널에 가입해주세요');
        history.push(`/channel/${channelId}/profile`);
      }
    }
  }, [isFinished]);

  useEffect(() => {
    return () => {
      dispatch(initArchive());
    };
  }, [dispatch]);

  if (!channel || !archive || !isFinished) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <Archive
      userId={userId}
      channel={channel}
      archive={archive}
      onEditArchive={onEditArchive}
      onDeleteArchive={onDeleteArchive}
    />
  );
};

export default ArchiveContainer;
