/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import { ReactComponent as Owner } from '../../lib/assets/owner.svg';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Time } from '../../lib/assets/time.svg';

const RoomCard = ({ room }) => {
  const handleMoveChat = () => {
    window.open(`/chat/${room.id}`, '_blank', 'width=600, height=900, toolbars=no, scrollbars=yes');
    return false;
  };

  return (
    <Box css={roomCardWrapper(room.status)} onClick={handleMoveChat}>
      <Box css={roomTitle}>{room.name}</Box>
      <Box css={roomDescription}>
        <Typography css={description}>
          <Participants className="icon" />
          {room.roomParticipant.length}
        </Typography>
        <Typography css={description}>
          <Owner className="icon" />
          {room.roomOwner.nickname}
        </Typography>
        <Typography css={description}>
          <Time className="icon" />
          {new Date(room.createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

const ChannelChatList = ({ roomList }) => {
  return (
    <Box css={chatListWrapper}>
      <Box css={sectionWrapper}>
        <Typography css={sectionTitle}>오픈된 채팅방</Typography>
        {roomList.openRoom.length === 0 && <Box css={notFound}>오픈된 채팅방이 없습니다.</Box>}
        <Grid container spacing={3}>
          {roomList.openRoom.map((room) => (
            <Grid item key={room.id}>
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box css={sectionWrapper}>
        <Typography css={sectionTitle}>예약 채팅방</Typography>
        {roomList.reservedRoom.length === 0 && <Box css={notFound}>예약된 채팅방이 없습니다.</Box>}
        <Grid container spacing={3}>
          {roomList.reservedRoom.map((room) => (
            <Grid item key={room.id}>
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default ChannelChatList;

const chatListWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 3.125rem calc((100% - 71.25rem) / 2);
`;

const sectionWrapper = css`
  margin-top: 3.4375rem;
`;

const sectionTitle = css`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const notFound = css`
  width: 100%;
  height: 8.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  color: #5f5f5f;
`;

const roomCardWrapper = (status) => css`
  width: 10.625rem;
  height: 8.125rem;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  background: ${status === 'Open' ? '#FFFFFF' : '#F0F0F0'};
  padding: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3.5px rgba(0, 0, 0, 0.5);
  }
`;

const roomTitle = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 0.75rem;
`;

const roomDescription = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const description = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 500;
  color: #7b7b7b;
  .icon {
    margin-right: 0.1625rem;
  }
`;
