/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo } from 'react';
import palette from '../../lib/styles/palette';

const ChatItem = ({ message, isContinue, isMe }) => {
  console.log({ message, isContinue, isMe });
  return (
    <Box css={chatItemWrapper}>
      {!isMe && !isContinue && (
        <Box css={userWrapper}>
          <Avatar src={message.sendUser.profile.profileImage.src} />
          <Typography>{message.sendUser.nickname}</Typography>
        </Box>
      )}
      <Box css={[messageWrapper(isContinue, isMe), css``]}>
        <Typography>{message.content}</Typography>
      </Box>
    </Box>
  );
};

const chatItemWrapper = css`
  width: 100%;
  margin-top: 0.625rem;
`;

const userWrapper = css`
  display: flex;
  align-items: center;
  margin-left: 1.25rem;
  .MuiAvatar-root {
    width: 2.5rem;
    height: 2.5rem;
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.15);
  }
  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    text-align: center;
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const messageWrapper = (isContinue, isMe) => css`
  position: relative;
  left: ${!isMe && '4.6875rem'};
  width: fit-content;
  height: fit-content;
  padding: 0.625rem;
  color: ${isMe && palette.white};
  background: ${isMe ? 'rgba(255, 81, 27, 0.8);' : '#f0f0f0'};
  margin: ${isMe ? '0 1.875rem 0 auto' : '0 auto 0 0'};
  border-radius: ${isContinue
    ? '20px'
    : isMe
    ? '20px 3px 20px 20px;'
    : '3px 20px 20px 20px;'};
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    letter-spacing: 0;
    word-wrap: break-word;
    white-space: pre;
  }
`;

export default memo(ChatItem);
