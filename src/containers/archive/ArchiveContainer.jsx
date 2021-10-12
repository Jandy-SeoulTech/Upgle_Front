import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import Loading from '../../components/common/Loading';
import Archive from '../../components/archive/Archive';
import { getArchive, initArchive } from '../../modules/archive';

const ArchiveContainer = ({ channelId, archiveId }) => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const { archive } = useSelector((state) => state.archive);
  const dispatch = useDispatch();

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

  return <Archive userId={userId} channel={channel} archive={archive} />;
};

export default ArchiveContainer;
