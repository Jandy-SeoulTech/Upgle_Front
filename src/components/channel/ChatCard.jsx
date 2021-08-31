/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { ReactComponent as Owner } from '../../lib/assets/owner.svg';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import ClearIcon from '@material-ui/icons/Clear';

const ChatCard = ({ chatInfo }) => {
  const history = useHistory();

  const handleMoveChat = () => {
    history.push(`/chat/${chatInfo.id}`);
  };

  const handleExitChat = (e) => {
    e.stopPropagation();
    console.log('채팅방 나가기 구현하기');
  };

  return (
    <Paper css={CharCardWrapper} onClick={handleMoveChat}>
      <Box css={topContent}>
        <ClearIcon css={cnacelIcon} onClick={handleExitChat} />
        <Typography css={title}>{chatInfo.title}</Typography>
        <Typography css={description}>
          <Participants className="icon" />
          {chatInfo.total}
        </Typography>
        <Typography css={description}>
          <Owner className="icon" />
          {chatInfo.owner}
        </Typography>
      </Box>
      <Box css={bottomContent}>
        <Avatar css={bottomIcon}></Avatar>
        <Typography css={bottomTitle}>{chatInfo.channel}</Typography>
      </Box>
    </Paper>
  );
};

const CharCardWrapper = css`
  width: 10.625rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
  }
`;

const cnacelIcon = css`
  width: 1rem;
  height: 1rem;
  position: relative;
  top: -0.4375rem;
  left: 8.3rem;
  cursor: pointer;
`;

const topContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.9375rem;
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

export default ChatCard;
