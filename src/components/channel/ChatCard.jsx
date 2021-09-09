/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { ReactComponent as Owner } from '../../lib/assets/owner.svg';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Time } from '../../lib/assets/time.svg';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '../common/Button';

const ChatCard = ({ isFinished, user, chatInfo, onCloseRoom, onExitRoom }) => {
  const [exit, setExit] = useState(false);
  const handleMoveChat = () => {
    window.open(
      `/chat/${chatInfo.id}`,
      '_blank',
      'width=600, height=900, toolbars=no, scrollbars=yes',
    );
    return false;
  };

  const handleExitOpen = (e) => {
    e.stopPropagation();
    setExit(true);
  };

  const handleExit = (e) => {
    e.stopPropagation();
    if (user === 'admin') onCloseRoom({ roomId: chatInfo.id });
    else onExitRoom({ roomId: chatInfo.id });
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setExit(false);
  };

  return (
    <Box css={CharCardWrapper} onClick={handleMoveChat}>
      {exit && (
        <Box css={exitWrapper}>
          {isFinished ? (
            <>
              <Typography className="reviewTitle">
                종료된 채팅방 입니다.
              </Typography>
              <Button className="exit" onClick={handleExit}>
                리뷰 작성
              </Button>
            </>
          ) : (
            <>
              <Button className="exit" onClick={handleExit}>
                채팅방 {user === 'admin' ? '끝내기' : '나가기'}
              </Button>
              <Button className="cancel" onClick={handleCancel}>
                취소
              </Button>
            </>
          )}
        </Box>
      )}
      <Box css={topContent}>
        <ClearIcon css={cnacelIcon} onClick={handleExitOpen} />
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
      <Box css={bottomContent}>
        <Avatar
          css={bottomIcon}
          src={chatInfo.channel.channelImage.src}
        ></Avatar>
        <Typography css={bottomTitle}>{chatInfo.channel.name}</Typography>
      </Box>
    </Box>
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

const exitWrapper = css`
  width: 10.625rem;
  height: 12.5rem;
  border-radius: 5px;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .MuiButton-root {
    width: 6.5rem;
    height: 1.875rem;
    border: none;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.3125rem 0.625rem;
  }
  .MuiButton-root + .MuiButton-root {
    margin-top: 1.25rem;
  }
  .reviewTitle {
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 0.875rem;
  }
  .exit {
    background: #ff511b;
    border-radius: 20px;
    color: white;
  }
  .cancel {
    background: white;
    border-radius: 20px;
    color: #5f5f5f;
  }
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
