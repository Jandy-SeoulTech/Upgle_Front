import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelArchiveList from '../../components/channel/ChannelArchiveList';
import Loading from '../../components/common/Loading';
import { getChannelArchive, initArchive } from '../../modules/archive';
import { getChannelData } from '../../modules/channel';
import qs from 'qs';

const ChannelArchiveListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { channelArchive, totalPage } = useSelector((state) => state.archive);
  const dispatch = useDispatch();

  const { page = 1, pageSize = 10 } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const onQueryChange = (key, value) => {
    const query = { page, pageSize };
    history.push(`/channel/${channelId}/post?${qs.stringify({ ...query, [key]: value })}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getChannelArchive({ channelId, query: qs.stringify({ page, pageSize }) }));
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initArchive());
    };
  }, [dispatch, channelId]);

  if (!channel || !channelArchive) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <ChannelArchiveList
      channel={channel}
      archives={channelArchive}
      page={parseInt(page, 10)}
      lastPage={parseInt(totalPage, 10)}
      onQueryChange={onQueryChange}
    />
  );
};

export default ChannelArchiveListContainer;
