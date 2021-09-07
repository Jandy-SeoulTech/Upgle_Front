/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo } from 'react';
import palette from '../../lib/styles/palette';

const RoomChatItem = ({ message, isContinue, right, isMe, admin }) => {
  return (
    <Box css={chatItemWrapper}>
      {!isContinue && (
        <Box css={userWrapper(right)}>
          {right && <Typography>{message.sendUser.nickname}</Typography>}
          <Avatar
            src={
              message.sendUser['profile'] &&
              message.sendUser.profile.profileImage.src
            }
          />
          {!right && <Typography>{message.sendUser.nickname}</Typography>}
        </Box>
      )}
      <Box css={[messageWrapper({ isContinue, right, isMe, admin }), css``]}>
        <Typography>{message.content}</Typography>
      </Box>
    </Box>
  );
};

const chatItemWrapper = css`
  width: 100%;
  margin-top: 0.84rem;
`;

const userWrapper = (right) => css`
  display: flex;
  align-items: center;
  justify-content: ${right && 'flex-end'};
  margin: ${right ? '0 2.5rem 0 0' : '0 0 0 2.5rem'};
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
    margin: ${right ? '0 0.9rem 0 0' : '0 0 0 0.9rem'};
    margin-bottom: 0.67rem;
  }
`;

const messageWrapper = ({ isContinue, right, isMe, admin }) => css`
  position: relative;
  left: ${!right && '6.25rem'};
  right: ${right && '6.25rem'};
  width: fit-content;
  height: fit-content;
  padding: 0.84rem;
  color: ${!admin && isMe && palette.white};
  background: ${!admin && isMe ? 'rgba(255, 81, 27, 0.8);' : '#f0f0f0'};
  margin: ${right ? '0 0 0 auto' : '0 auto 0 0'};
  border-radius: ${isContinue
    ? '20px'
    : right
    ? '20px 3px 20px 20px;'
    : '3px 20px 20px 20px;'};
  border: ${admin && '2px solid #04BD9E'};
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    letter-spacing: 0;
    word-wrap: break-word;
    white-space: pre;
    font-size: 1.167rem;
  }
`;

export default memo(RoomChatItem);
