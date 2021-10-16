import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/search/Search';
import {
  getArchiveSearch,
  getChannelSearch,
  getUserSearch,
  initSearch,
} from '../../modules/search';

const SearchContainer = ({ keyword, code }) => {
  const dispatch = useDispatch();
  const { channels, users, archives } = useSelector((state) => state.search);

  const onChannelSearch = ({ skip, take }) => {
    dispatch(getChannelSearch({ keyword, code, skip, take }));
  };

  const onUserSearch = ({ skip, take }) => {
    dispatch(getUserSearch({ keyword, skip, take }));
  };

  const onArchiveSearch = ({ skip, take }) => {
    dispatch(getArchiveSearch({ keyword, skip, take }));
  };

  useEffect(() => {
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
      channels={channels}
      users={users}
      archives={archives}
    />
  );
};

export default SearchContainer;
