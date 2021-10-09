import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelArchive from '../../components/channel/ChannelArchive';
import Loading from '../../components/common/Loading';
import { getChannelArchive } from '../../modules/archive';
import { getChannelData } from '../../modules/channel';

const ChannelArchiveContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { channelArchive } = useSelector((state) => state.archive);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getChannelArchive(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch]);

  if (!channel || !channelArchive) return <Loading css={{ backgroundColor: '#fafafc' }} />;
  return <ChannelArchive channelArchive={channelArchive} channel={channel} />;
};

export default ChannelArchiveContainer;
