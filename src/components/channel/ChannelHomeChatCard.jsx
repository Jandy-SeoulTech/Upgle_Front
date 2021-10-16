/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { ReactComponent as Owner } from '../../lib/assets/owner.svg';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Time } from '../../lib/assets/time.svg';

const ChannelHomeChatCard = ({ chatInfo }) => {
  const handleMoveChat = (roomId) => {
    window.open(`/room/${roomId}`, '_blank', 'width=600, height=900, toolbars=no, scrollbars=yes');
    return false;
  };

  return (
    <Box
      css={CharCardWrapper}
      onClick={() => {
        handleMoveChat(chatInfo.id);
      }}
    >
      <Typography css={title}>{chatInfo.name}</Typography>
      <Typography css={description}>
        <Participants className="icon" />
        {chatInfo.roomParticipant.length}
      </Typography>
      <Typography css={description}>
        <Owner className="icon" />
        {chatInfo.roomOwner.nickname}
      </Typography>
      <Typography css={description}>
        <Time className="icon" />
        {new Date(chatInfo.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
};

const CharCardWrapper = css`
  width: 10.3125rem;
  height: 8.125rem;
  padding: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  position: relative;
  top: -0.5rem;
  flex: 1;
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

const bottomContent = css`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  padding: 0.9375rem;
  border-radius: 0 0 5px 5px;
`;

const bottomIcon = css`
  width: 1.875rem;
  height: 1.875rem;
`;

const bottomTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 400;
  margin-left: 0.5rem;
`;

export default ChannelHomeChatCard;
