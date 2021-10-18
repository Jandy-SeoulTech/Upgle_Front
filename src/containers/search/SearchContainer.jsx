import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/search/Search';
import {
  getArchiveSearch,
  getChannelSearch,
  getUserSearch,
  initSearch,
} from '../../modules/search';
import { follow, unfollow } from '../../modules/user';

const SearchContainer = ({ keyword, code }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { totalCounts, channels, users, archives } = useSelector((state) => state.search);

  const onChannelSearch = ({ skip, take }) => {
    dispatch(getChannelSearch({ keyword, code, skip, take }));
  };

  const onUserSearch = ({ skip, take }) => {
    dispatch(getUserSearch({ keyword, skip, take }));
  };

  const onArchiveSearch = ({ skip, take }) => {
    dispatch(getArchiveSearch({ keyword, skip, take }));
  };

  const onFollow = ({ followingId }) => {
    dispatch(follow({ followingId }));
  };

  const onUnfollow = ({ followingId }) => {
    dispatch(unfollow({ followingId }));
  };

  useEffect(() => {
    dispatch(initSearch());
    dispatch(getChannelSearch({ keyword, code }));
    dispatch(getUserSearch({ keyword }));
    dispatch(getArchiveSearch({ keyword }));
  }, [dispatch, keyword, code]);

  useEffect(() => {
    return () => {
      dispatch(initSearch());
    };
  }, [dispatch]);

  return (
    <Search
      keyword={keyword}
      code={code}
      onChannelSearch={onChannelSearch}
      onUserSearch={onUserSearch}
      onArchiveSearch={onArchiveSearch}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      loggedInUser={user}
      totalCounts={totalCounts}
      channels={channels}
      users={users}
      archives={archives}
    />
  );
};

export default SearchContainer;
