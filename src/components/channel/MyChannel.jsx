/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';
import ReviewModalContainer from '../../containers/common/ReviewModalContainer';
import { ReactComponent as Amico } from '../../lib/assets/amico.svg';
import palette from '../../lib/styles/palette';

import Button from '../common/Button';
import ChannelCard from './ChannelCard';
import ChatCard from './ChatCard';

const MyChannel = ({
  user,
  ownerRoom,
  participantRoom,
  adminChannel,
  participantChannel,
  onGetMychannel,
  onExitRoom,
  onCloseRoom,
}) => {
  const [reviewRoom, setReviewRoom] = useState(null);
  const history = useHistory();
  return (
    <Box css={myChannelWrapper}>
      <Box css={myChannelContent}>
        <Box css={myChannelTitle}>
          <Amico />
          <Typography>
            자신이 잘하는 재능을 공유하거나, 관심있는 재능을 배울 수 있는 재능 공유 채널을
            만들어보세요.
          </Typography>
          <Button
            onClick={() => {
              history.push('/channel/edit');
            }}
          >
            채널 만들기
          </Button>
        </Box>

        <ReviewModalContainer
          room={reviewRoom}
          open={!!reviewRoom}
          setOpen={setReviewRoom}
          onSuccess={onGetMychannel}
        />

        <Box css={asignChatListWrapper}>
          <Typography css={listTitle}>오픈 채팅방</Typography>
          {ownerRoom.length === 0 && (
            <Typography css={nullDescription}>아직 오픈한 채팅방이 없습니다.</Typography>
          )}
          <Grid container spacing={2}>
            {ownerRoom.map((room) => (
              <Grid key={room.id} item>
                <ChatCard
                  isClosed={room.status === 'Close'}
                  isReserved={room.status === 'Reservation'}
                  user={user}
                  room={room}
                  onCloseRoom={onCloseRoom}
                  setReviewRoom={setReviewRoom}
                  onGetMychannel={onGetMychannel}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box css={asignChatListWrapper}>
          <Typography css={listTitle}>참여 채팅방</Typography>
          {participantRoom.length === 0 && (
            <Typography css={nullDescription}>현재 참여하고 있는 채팅방이 없습니다.</Typography>
          )}
          <Grid container spacing={2}>
            {participantRoom.map((room) => (
              <Grid key={room.id} item>
                <ChatCard
                  isClosed={
                    room.roomParticipant
                      .map((item) => {
                        if (item.userId === user.id && item.status === 'inactive') return true;
                        return false;
                      })
                      .reduce((sum, item) => {
                        return sum + item;
                      }) || room.status === 'Close'
                  }
                  isReserved={room.status === 'Reservation'}
                  user={user}
                  room={room}
                  onExitRoom={onExitRoom}
                  setReviewRoom={setReviewRoom}
                  onGetMychannel={onGetMychannel}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box css={openChannelWrapper}>
          <Typography css={listTitle}>오픈 채널</Typography>
          {adminChannel.length === 0 && (
            <Typography css={nullDescription}>아직 오픈한 채널이 없습니다.</Typography>
          )}
          <Grid container spacing={2}>
            {adminChannel.map((channel) => (
              <Grid key={channel.id} item>
                <ChannelCard channel={channel} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box css={partChannelWrapper}>
          <Typography css={listTitle}>참여 채널</Typography>
          {participantChannel.length === 0 && (
            <Typography css={nullDescription}>아직 참여하는 채널이 없습니다.</Typography>
          )}
          <Grid container spacing={2}>
            {participantChannel.map((channel) => (
              <Grid key={channel.id} item>
                <ChannelCard channel={channel} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const myChannelWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 7.4375rem;
  margin-bottom: 4rem;
`;

const myChannelContent = css`
  width: 75rem;
  padding: 0 2rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const myChannelTitle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiTypography-root {
    margin-top: 5rem;
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

const nullDescription = css`
  width: 100%;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 1rem;
  color: #5f5f5f;
`;

const asignChatListWrapper = css`
  margin-top: 5.25rem;
  width: 100%;
`;

const openChannelWrapper = css`
  margin-top: 4.1875rem;
  width: 100%;
`;

const partChannelWrapper = css`
  margin-top: 4.1875rem;
  width: 100%;
`;

export default MyChannel;
