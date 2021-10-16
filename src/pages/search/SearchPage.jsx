import React from 'react';
import { useLocation } from 'react-router';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import SearchContainer from '../../containers/search/SearchContainer';

const SearchPage = () => {
  const qs = new URLSearchParams(useLocation().search);
  const keyword = qs.get('keyword');
  const code = qs.get('code');

  return (
    <>
      <HeaderContainer />
      <SearchContainer keyword={keyword} code={code} />
      <FooterContainer />
    </>
  );
};

export default SearchPage;
