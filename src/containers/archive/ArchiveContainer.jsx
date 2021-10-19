import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import Loading from '../../components/common/Loading';
import Archive from '../../components/archive/Archive';
import { deleteArchive, getArchive, initArchive } from '../../modules/archive';
import { setArchive } from '../../modules/write';
import { useHistory } from 'react-router';

const ArchiveContainer = ({ channelId, archiveId }) => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const { archive } = useSelector((state) => state.archive);
  const history = useHistory();
  const dispatch = useDispatch();

  const onEditArchive = async () => {
    await dispatch(setArchive(archive));
    history.push(`/channel/${channelId}/editArchive`);
  };

  const onDeleteArchive = async () => {
    await dispatch(deleteArchive(archiveId));
    history.push(`/channel/${channelId}/archive`);
  };

  useEffect(() => {
    dispatch(getChannelData(channelId));
    dispatch(getArchive(archiveId));
  }, [dispatch, channelId, archiveId]);

  useEffect(() => {
    return () => {
      dispatch(initArchive());
    };
  }, [dispatch]);

  if (!channel || !archive) return <Loading css={{ backgroundColor: '#fafafc' }} />;

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
