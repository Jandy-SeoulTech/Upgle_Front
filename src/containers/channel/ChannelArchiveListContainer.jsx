import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelArchiveList from '../../components/channel/ChannelArchiveList';
import Loading from '../../components/common/Loading';
import { getChannelArchive } from '../../modules/archive';
import { getChannelData } from '../../modules/channel';

const ChannelArchiveListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { channelArchive } = useSelector((state) => state.archive);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getChannelArchive(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch]);

  if (!channel || !channelArchive) return <Loading css={{ backgroundColor: '#fafafc' }} />;
  return <ChannelArchiveList channelArchive={channelArchive} channel={channel} />;
};

export default ChannelArchiveListContainer;
