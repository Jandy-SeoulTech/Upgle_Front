import React, { useEffect } from 'react';
import Search from '../../components/search/Search';

const SearchContainer = ({ keyword }) => {
  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  return <Search keyword={keyword} />;
};

export default SearchContainer;
