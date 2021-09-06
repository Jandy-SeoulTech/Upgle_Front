/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import ChatListContainer from '../../containers/chat/ChatListContainer';
import palette from '../../lib/styles/palette';

const ChannelTalk = ({ channel }) => {
  return (
    <Box css={talkWrapper}>
      <Box css={talkTitle}>
        <Typography>자유로운 대화</Typography>
      </Box>
      <ChatListContainer channel={channel} />
    </Box>
  );
};

const talkWrapper = css`
  top: 9.6875rem;
  left: calc((100% - 71.25rem) / 2);
  width: 34.875rem;
  height: 55.9375rem;
  background: ${palette.white};
  position: fixed;
  z-index: 998;
`;

const talkTitle = css``;

export default ChannelTalk;
