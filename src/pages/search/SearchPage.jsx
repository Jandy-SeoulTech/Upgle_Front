import React from 'react';
import { useLocation } from 'react-router';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import SearchContainer from '../../containers/search/SearchContainer';

const SearchPage = () => {
  const qs = new URLSearchParams(useLocation().search);
  const keyword = qs.get('keyword');

  return (
    <>
      <HeaderContainer />
      <SearchContainer keyword={keyword} />
      <FooterContainer />
    </>
  );
};

export default SearchPage;
