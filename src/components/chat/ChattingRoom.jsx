/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo, useEffect, useRef } from 'react';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { TextArea } from '../TextField';
import RoomChatItem from './RoomChatItem';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Hamburger } from '../../lib/assets/hamburger.svg';

const ChattingRoom = ({
  user,
  room,
  message,
  messages,
  setMessage,
  handleSendMessage,
  handleGetMassage,
}) => {
  const chatEndRef = useRef();
  const handleScroll = (e) => {
    if (e.target.scrollTop < 100) {
      handleGetMassage();
    }
  };

  const scrollBottom = () => {
    chatEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <Box css={chatListWrapper}>
      <Box css={roomTitle}>
        <Box css={{ margin: '1.67rem 0 0.58rem 1.25rem' }}>
          <Typography css={title}>{room.title}</Typography>
          <Box css={total}>
            <Participants />
            <Typography>72</Typography>
          </Box>
        </Box>
        <Box css={{ marginLeft: '1.25rem' }}>
          <Avatar css={profileImage}></Avatar>{' '}
          <Typography css={nickname}>{room.admin.nickname}</Typography>
        </Box>
        <Box css={nav}>
          <Box css={[navItem, { background: `${palette.white}` }]}>채팅</Box>
          <Box css={[navItem, { background: `#FFFFFF33`, color: '#BDBDBD' }]}>
            화면
          </Box>
          <Box css={[navItem, { background: `${palette.black}` }]}>
            <Hamburger />
          </Box>
        </Box>
      </Box>
      <Box css={chatWrapper} onScroll={handleScroll}>
        {[...messages].reverse().map((message, i) => (
          <RoomChatItem
            key={message.id}
            isContinue={
              i > 0 &&
              [...messages].reverse()[i - 1].sendUserId === message.sendUserId
            }
            prevMessage={i ? messages[i - 1] : { sendUserId: 0 }}
            right={
              user.id === room.admin.id
                ? message.sendUserId === room.admin.id
                : message.sendUserId !== room.admin.id
            }
            isMe={user.id === message.sendUserId}
            admin={message.sendUserId === room.admin.id}
            message={message}
          />
        ))}
        <div ref={chatEndRef}></div>
      </Box>
      <Box css={sendMessageForm}>
        <TextArea
          value={message}
          placeholder="여기에 입력해주세요"
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (!e.shiftKey && e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          css={chatInput}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          css={sendButton}
        >
          전송
        </Button>
      </Box>
    </Box>
  );
};

const chatListWrapper = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const roomTitle = css`
  height: 6.67rem;
  background-color: ${palette.black};
  border-radius: 0px 0px 5px 5px;
  .MuiBox-root {
    display: flex;
    align-items: center;
  }
`;

const title = css`
  font-family: 'Noto Sans KR';
  font-weight: 600;
  color: ${palette.white};
  font-size: 1.5rem;
  margin-right: 0.84rem;
`;

const total = css`
  border: 1px solid #bdbdbd;
  border-radius: 20px;
  padding: 0.25rem 0.833rem;
  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-size: 1rem;
    color: #bdbdbd;
  }
`;

const profileImage = css`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.833rem;
`;

const nickname = css`
  font-size: 0.75rem;
  font-family: Noto Sans;
  font-weight: 500;
  color: #bdbdbd;
`;

const nav = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 3.916666666666667rem;
  margin-left: auto;
`;

const navItem = css`
  width: 5.5rem;
  height: 2.75rem;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 1.166rem;
`;

const chatWrapper = css`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  flex: 1;
  overflow: auto;
`;

const sendMessageForm = css`
  display: flex;
  height: 10.84rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;
`;

const chatInput = css`
  flex: 1;
  height: 100% !important;
  border: 0;
  border-radius: 10px;
  font-size: 1.34rem;
  &:focus-visible {
    outline: 0 !important;
  }
`;

const sendButton = css`
  width: 4.34rem;
  height: 2.583rem;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 1.3125rem 1.125rem 0 0;
  font-size: 1.167rem;
  box-shadow: none;
`;

export default memo(ChattingRoom);
