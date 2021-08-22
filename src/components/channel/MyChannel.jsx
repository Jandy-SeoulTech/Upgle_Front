/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, Paper, Typography } from '@material-ui/core';
import { ReactComponent as Amico } from '../../lib/assets/amico.svg';
import palette from '../../lib/styles/palette';

import Button from '../common/Button';
import ChannelCard from './ChannelCard';
import ChatCard from './ChatCard';

const MyChannel = ({ asignChatList, openChannelList, partChannelList }) => {
  return (
    <Box css={myChannelWrapper}>
      <Box css={myChannelTitle}>
        <Amico />
        <Typography>
          자신이 잘하는 재능을 공유하거나, 관심있는 재능을 배울 수 있는 재능
          공유 채널을 만들어보세요.
        </Typography>
        <Button>채널 만들기</Button>
      </Box>

      <Box css={asignChatListWrapper}>
        <Typography css={listTitle}>참여 채팅방</Typography>
        <Grid container spacing={2}>
          {asignChatList.map((chatInfo) => (
            <Grid key={chatInfo.id} item>
              <ChatCard chatInfo={chatInfo} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box css={openChannelWrapper}>
        <Typography css={listTitle}>오픈 채널</Typography>
        <Grid container spacing={2}>
          {openChannelList.map((channelInfo) => (
            <Grid key={channelInfo.id} item>
              <ChannelCard channelInfo={channelInfo} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box css={partChannelWrapper}>
        <Typography css={listTitle}>참여 채널</Typography>
        <Grid container spacing={2}>
          {partChannelList.map((channelInfo) => (
            <Grid key={channelInfo.id} item>
              <ChannelCard channelInfo={channelInfo} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const myChannelWrapper = css`
  width: 71.25rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 9.1875rem auto 50px auto;
`;

const myChannelTitle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiTypography-root {
    margin-top: 6.25rem;
    margin-bottom: 1.875rem;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
  }

  .MuiButton-root {
    width: 12.3125rem;
    height: 3.5rem;
    background: ${palette.black};
    color: ${palette.white};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const listTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const asignChatListWrapper = css`
  margin-top: 11.8125rem;
`;

const openChannelWrapper = css`
  margin-top: 4.1875rem;
`;

const partChannelWrapper = css`
  margin-top: 4.1875rem;
`;

export default MyChannel;
