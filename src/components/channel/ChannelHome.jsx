/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';

const ChannerHome = ({ channel, ChatListComponent }) => {
  return (
    <Grid container css={channerHomeWrapper} spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h4">잡담방</Typography>
        <Box css={talkWrapper}>
          <ChatListComponent namespace={`channel-${1}`} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4">게시판</Typography>
        <Box css={boardWrapper}></Box>
        <Typography variant="h4">채팅방</Typography>
        <Box css={chatWrapper}></Box>
        <Typography variant="h4">모아보기</Typography>
        <Box css={collectWrapper}></Box>
      </Grid>
    </Grid>
  );
};

const channerHomeWrapper = css`
  margin-top: 3.75rem;
  margin-bottom: 10rem;
  height: 30rem;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
`;

const talkWrapper = css`
  height: fit-content;
  background: rgba(0, 0, 0, 0.1);
`;

const boardWrapper = css`
  height: 30%;
  background: rgba(0, 0, 0, 0.1);
`;

const chatWrapper = css`
  height: 20%;
  background: rgba(0, 0, 0, 0.1);
`;

const collectWrapper = css`
  height: 32%;
  background: rgba(0, 0, 0, 0.1);
`;

export default ChannerHome;
