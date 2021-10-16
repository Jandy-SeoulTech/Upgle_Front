/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo } from 'react';
import palette from '../../lib/styles/palette';

const TalkMessage = ({ message, isContinue, isMe }) => {
  return (
    <Box css={talkMessageWrapper}>
      {!isMe && !isContinue && (
        <Box css={userWrapper}>
          <Avatar src={message.sendUser['profile'] && message.sendUser.profile.profileImage} />
          <Typography>{message.sendUser.nickname}</Typography>
        </Box>
      )}
      <Box css={[messageWrapper(isContinue, isMe), css``]}>
        <Typography>{message.content}</Typography>
      </Box>
    </Box>
  );
};

const talkMessageWrapper = css`
  width: 100%;
  margin-top: 0.84rem;
`;

const userWrapper = css`
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  .MuiAvatar-root {
    width: 3.34rem;
    height: 3.34rem;
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.15);
  }
  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 0.9rem;
    margin-bottom: 0.67rem;
  }
`;

const messageWrapper = (isContinue, isMe) => css`
  max-width: 70%;
  position: relative;
  left: ${!isMe && '6.25rem'};
  width: fit-content;
  height: fit-content;
  padding: 0.84rem;
  color: ${isMe && palette.white};
  background: ${isMe ? 'rgba(255, 81, 27, 0.8);' : '#f0f0f0'};
  margin: ${isMe ? '0 2.5rem 0 auto' : '0 auto 0 0'};
  border-radius: ${isContinue ? '20px' : isMe ? '20px 3px 20px 20px;' : '3px 20px 20px 20px;'};
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    letter-spacing: 0;
    word-wrap: break-word;
    white-space: pre-line;
    font-size: 1.167rem;
  }
`;

export default memo(TalkMessage);
