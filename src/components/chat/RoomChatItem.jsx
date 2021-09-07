/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo } from 'react';
import palette from '../../lib/styles/palette';

const RoomChatItem = ({ message, isContinue, right, admin }) => {
  return (
    <Box css={chatItemWrapper}>
      {!right && !isContinue && (
        <Box css={userWrapper}>
          <Avatar
            src={
              message.sendUser['profile'] &&
              message.sendUser.profile.profileImage.src
            }
          />
          <Typography>{message.sendUser.nickname}</Typography>
        </Box>
      )}
      <Box css={[messageWrapper({ isContinue, right, admin }), css``]}>
        <Typography>{message.content}</Typography>
      </Box>
    </Box>
  );
};

const chatItemWrapper = css`
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

const messageWrapper = ({ isContinue, right, admin }) => css`
  position: relative;
  left: ${!right && '6.25rem'};
  width: fit-content;
  height: fit-content;
  padding: 0.84rem;
  color: ${right && palette.white};
  background: ${right ? 'rgba(255, 81, 27, 0.8);' : '#f0f0f0'};
  margin: ${right ? '0 2.5rem 0 auto' : '0 auto 0 0'};
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
