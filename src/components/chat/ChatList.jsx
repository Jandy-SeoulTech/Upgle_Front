/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({
  user,
  message,
  messages,
  setMessage,
  handleSendMessage,
}) => {
  return (
    <Box css={chatListWrapper}>
      <Box css={ChatWrapper}>
        {messages.map((message) => (
          <ChatItem key={message.id} user={user} message={message} />
        ))}
      </Box>
      <Box css={sendMessageForm}>
        <TextField
          variant="filled"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          전송
        </Button>
      </Box>
    </Box>
  );
};

const chatListWrapper = css`
  width: 100%;
  height: 33rem;
  display: flex;
  flex-direction: column;
`;

const ChatWrapper = css`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
`;

const sendMessageForm = css`
  display: flex;
  .MuiTextField-root {
    flex: 1;
  }
`;

export default ChatList;
