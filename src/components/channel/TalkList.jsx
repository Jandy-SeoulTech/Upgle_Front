/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@material-ui/core';
import { memo, useRef, useEffect } from 'react';
import Button from '../common/Button';
import { TextArea } from '../TextField';
import ChatItem from './TalkMessage';

const TalkList = ({ user, message, messages, setMessage, handleSendMessage, handleGetMassage }) => {
  const chatEndRef = useRef();

  const handleScroll = (e) => {
    if (e.target.scrollTop < 100) {
      handleGetMassage();
    }
  };

  const scrollBottom = () => {
    chatEndRef.current.scrollIntoView();
    window.scroll(0, 0);
  };

  const onSendMessage = async () => {
    await handleSendMessage();
    scrollBottom();
  };

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <Box css={talkListWrapper}>
      <Box css={talkWrapper} onScroll={handleScroll}>
        {[...messages].reverse().map((message, i) => (
          <ChatItem
            key={message.id}
            user={user}
            isContinue={i > 0 && [...messages].reverse()[i - 1].sendUserId === message.sendUserId}
            prevMessage={i ? messages[i - 1] : { sendUserId: 0 }}
            isMe={user.id === message.sendUserId}
            message={message}
          />
        ))}
        <div ref={chatEndRef}></div>
      </Box>
      <Box css={sendMessageForm}>
        <TextArea
          value={message}
          placeholder="여기에 입력해주세요"
          onChange={(e) => {
            if (e.target.value === '\n') return;
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (!e.shiftKey && e.key === 'Enter') {
              onSendMessage();
            }
          }}
          css={messageInput}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!message}
          css={sendButton}
        >
          전송
        </Button>
      </Box>
    </Box>
  );
};

const talkListWrapper = css`
  flex: 1;
  height: 44.6875rem;
  display: flex;
  flex-direction: column;
`;

const talkWrapper = css`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  flex: 1;
  overflow: auto;
`;

const sendMessageForm = css`
  display: flex;
  height: 8.125rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;
`;

const messageInput = css`
  flex: 1;
  height: 100% !important;
  border: 0;
  border-radius: 10px;
  &:focus-visible {
    outline: 0 !important;
  }
`;

const sendButton = css`
  width: 3.25rem;
  height: 1.9375rem;
  border-radius: 5px;
  margin: 1.3125rem 1.125rem 0 0;
  box-shadow: none;
  background: black;
  color: white;
  &:disabled {
    background: #e0e0e0;
  }
`;

export default memo(TalkList);
