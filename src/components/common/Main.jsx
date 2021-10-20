/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import Button from './Button';
import { ReactComponent as Start } from '../../lib/assets/start.svg';
import { ReactComponent as Search } from '../../lib/assets/search.svg';

const Main = ({ user }) => {
  const history = useHistory();
  return (
    <Box css={MainWrapper}>
      <div css={{ position: 'relative' }}>
        <img src="/image/main1.png" css={mainImage}></img>
        <div
          css={button}
          onClick={() => {
            history.push(user ? '/search' : '/signup');
          }}
        >
          {user ? (
            <Search css={{ width: '40%', height: '47.3684%' }} />
          ) : (
            <Start css={{ width: '40%', height: '47.3684%' }} />
          )}
        </div>
      </div>
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
  position: absolute;
  width: 10.4166%;
  height: 7.125%;
  top: 45.25%;
  left: 22.9166%;
  border: 0.125rem solid #ffffff;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border: 0.125rem solid #ffffff;
  }
`;

export default Main;
