import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArchiveList from '../../components/archive/ArchiveList';
import Loading from '../../components/common/Loading';
import { getChannelArchive, initArchive } from '../../modules/archive';
import { getChannelData } from '../../modules/channel';

const ArchiveListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { channelArchive } = useSelector((state) => state.archive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelArchive(channelId));
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initArchive());
    };
  }, [dispatch, channelId]);

  if (!channel || !channelArchive) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return <ArchiveList channel={channel} archives={channelArchive} />;
};

export default ArchiveListContainer;
