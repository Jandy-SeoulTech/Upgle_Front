/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { ReactComponent as Owner } from '../../lib/assets/owner.svg';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Time } from '../../lib/assets/time.svg';

const ChannelHomeChatCard = ({ room }) => {
  const handleMoveChat = (roomId) => {
    window.open(`/room/${roomId}`, '_blank', 'width=600, height=900, toolbars=no, scrollbars=yes');
    return false;
  };

  return (
    <Box css={wrapper} onClick={() => handleMoveChat(room.id)}>
      <Box>
        <Typography css={title}>{room.name}</Typography>
      </Box>
      <Box css={descriptions}>
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

const wrapper = css`
  width: 10.625rem;
  height: 8.125rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
  }
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.75rem;
  font-weight: 600;
`;

const descriptions = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.4688rem;
`;

const description = css`
  display: flex;
  align-items: center;
  column-gap: 0.625rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  color: #7b7b7b;
`;

export default ChannelHomeChatCard;
