/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ChannelTalk from './ChannelTalk';

const ChannerHome = ({ channel }) => {
  return (
    <Box css={channerHomeWrapper} spacing={2}>
      <ChannelTalk channel={channel} />
      <Box css={rightContent}>
        <Box css={boardWrapper}>
          <Typography variant="h4">게시판</Typography>
        </Box>
        <Box css={chatWrapper}>
          <Typography variant="h4">채팅방</Typography>
        </Box>
        <Box css={collectWrapper}>
          <Typography variant="h4">모아보기</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const channerHomeWrapper = css`
  margin-top: 8.4375rem;
  padding: 1rem calc((100% - 71.25rem) / 2);
  background-color: #fafafc;
  display: flex;
`;

const rightContent = css`
  display: flex;
  flex-direction: column;
`;

const boardWrapper = css`
  height: 30%;
`;

const chatWrapper = css`
  height: 20%;
`;

const collectWrapper = css`
  height: 32%;
`;

export default ChannerHome;
