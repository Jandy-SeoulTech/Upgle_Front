import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/common/Loading';
import { getChannelData } from '../../modules/channel';
import { getChannelPostList } from '../../modules/post';
import ChannelPostList from './../../components/channel/ChannelPostList';
import { useHistory, useLocation } from 'react-router';
import qs from 'qs';

const ChannelPostListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { postList, totalPage } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const {
    type = 'All',
    page = 1,
    pageSize = 10,
  } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const onQueryChange = (key, value) => {
    const query = { type, page, pageSize };
    history.push(`/channel/${channelId}/post?${qs.stringify({ ...query, [key]: value })}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getChannelPostList({ channelId, query: qs.stringify({ type, page, pageSize }) }));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId, location.search]);

  if (!channel || !postList) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <ChannelPostList
      postList={postList}
      channel={channel}
      type={type}
      page={parseInt(page, 10)}
      lastPage={parseInt(totalPage, 10)}
      onQueryChange={onQueryChange}
    />
  );
};

export default ChannelPostListContainer;
