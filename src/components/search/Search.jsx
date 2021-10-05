/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Search = ({ keyword }) => {
  return <div css={wrapper}>Search: {keyword}</div>;
};

const wrapper = css`
  margin-top: 3.75rem;
  height: 100vh;
`;

export default Search;
