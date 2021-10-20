/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import Button from './Button';

const Main = ({ user }) => {
  const history = useHistory();
  return (
    <Box css={MainWrapper}>
      <img src="/image/main1.png" css={mainImage}></img>
      <img src="/image/main2.png" css={mainImage}></img>
      <img src="/image/main3.png" css={mainImage}></img>
      <img src="/image/main4.png" css={mainImage}></img>
    </Box>
  );
};

const MainWrapper = css`
  margin-top: 3.75rem;
  &::-webkit-scrollbar {
    display: fixed;
  }
`;

const mainImage = css`
  width: 100%;
  object-fit: contain;
`;

const contentWrapper = css`
  padding-top: 4.125rem;
  padding-left: 0 calc((100% - 71.25rem) / 2);
  .title {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 2.625rem;
    color: white;
  }
  .title + .title {
    margin-top: 1rem;
  }

  .subtitle {
    margin-top: 1.5625rem;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1.125rem;
    color: white;
  }
  .subtitle + .subtitle {
    margin-top: 0.5rem;
  }
`;

const button = css`
  width: 12.5rem;
  height: 3.5625rem;
  margin-top: 4.5625rem;
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  border: 2px solid #ffffff;
  border-radius: 10px;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border: 2px solid #ffffff;
  }
`;

export default Main;
