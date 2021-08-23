/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import React, { memo, useEffect, useRef } from 'react';

const ChatItem = ({ user, message }) => {
  const msgRef = useRef();
  useEffect(() => {
    msgRef.current.scrollIntoView();
  });

  return user.id === message.sendUserId ? (
    <Box css={chatItemWrapper} ref={msgRef}>
      <Paper
        elevation={2}
        css={[
          messageWrapper,
          css`
            margin-left: auto;
          `,
        ]}
      >
        <Typography>{message.content}</Typography>
      </Paper>
      <Box css={userWrapper}>
        <Avatar src={message.sendUser.profile.profileImage.src} />
        <Typography>{message.sendUser.nickname}</Typography>
      </Box>
    </Box>
  ) : (
    <Box css={chatItemWrapper} ref={msgRef}>
      <Box css={userWrapper}>
        <Avatar src={message.sendUser.profile.profileImage.src} />
        <Typography>{message.sendUser.nickname}</Typography>
      </Box>
      <Paper
        elevation={2}
        css={[
          messageWrapper,
          css`
            margin-right: auto;
          `,
        ]}
      >
        <Typography>{message.content}</Typography>
      </Paper>
    </Box>
  );
};

const chatItemWrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const userWrapper = css`
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  .MuiAvatar-root {
    width: 2.7rem;
    height: 2.7rem;
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.15);
  }
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const messageWrapper = css`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 0.3rem;
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    letter-spacing: 0;
    word-wrap: break-word;
  }
`;

export default memo(ChatItem);
