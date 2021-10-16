/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import { memo, useEffect, useRef, useState } from 'react';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { TextArea } from '../TextField';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Hamburger } from '../../lib/assets/hamburger.svg';
import ClearIcon from '@material-ui/icons/Clear';
import ReviewContainer from '../../containers/common/ReviewModalContainer';
import Message from './Message';

const Room = ({
  user,
  room,
  messages,
  message,
  setMessage,
  handleSendMessage,
  handleGetMassage,
  replyMessage,
  setReplyMessage,
  participants,
  handleSuccess,
  onCloseRoom,
}) => {
  const [reviewToglle, setReviewToglle] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();
  const chatEndRef = useRef();
  const inputRef = useRef();
  const handleScroll = (e) => {
    if (e.target.scrollTop < 100) {
      handleGetMassage();
    }
  };

  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  const scrollBottom = () => {
    chatEndRef.current.scrollIntoView();
  };

  const onReply = (message) => {
    inputRef.current.focus();
    setReplyMessage(message);
  };

  const onSendMessage = async () => {
    await handleSendMessage();
    scrollBottom();
  };

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <Box css={chatListWrapper}>
      <ReviewContainer
        room={room}
        open={reviewToglle}
        setOpen={setReviewToglle}
        onSuccess={() => {
          window.close();
        }}
      />
      <Box css={roomTitle}>
        <Box css={{ margin: '1.67rem 0 0.58rem 1.25rem' }}>
          <Typography css={title}>{room.name}</Typography>
          <Box css={total}>
            <Participants />
            <Typography>{participants.length}</Typography>
          </Box>
        </Box>
        <Box css={{ marginLeft: '1.25rem' }}>
          <Avatar css={profileImage}></Avatar>{' '}
          <Typography css={nickname}>{room.roomOwner.nickname}</Typography>
        </Box>
        <Box css={nav}>
          <Box css={[navItem, { background: `${palette.white}` }]}>채팅</Box>
          <Box css={[navItem, { background: `#FFFFFF33`, color: '#BDBDBD' }]}>화면</Box>
          <Box css={[navItem, { background: `${palette.black}` }]}>
            <ClickAwayListener
              onClickAway={() => {
                setMenuAnchor(null);
              }}
            >
              <Box
                css={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={handleMenu}
              >
                <Hamburger />
                <Popper open={!!menuAnchor} anchorEl={menuAnchor} placement="bottom-end">
                  <Paper>
                    <MenuList dense css={menuWrapper}>
                      <MenuItem>
                        <ListItemText>알림끄기</ListItemText>
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemText>신고하기</ListItemText>
                      </MenuItem>
                      <Divider />
                      {user.id === room.roomOwner.id ? (
                        <MenuItem onClick={onCloseRoom}>
                          <ListItemText>채팅 끝내기</ListItemText>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={() => {
                            setReviewToglle(true);
                          }}
                        >
                          <ListItemText>나가기</ListItemText>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Paper>
                </Popper>
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>
      </Box>
      <Box css={chatWrapper} onScroll={handleScroll}>
        {[...messages].reverse().map((message, i) => (
          <Message
            key={message.id}
            isContinue={i > 0 && [...messages].reverse()[i - 1].sendUserId === message.sendUserId}
            prevMessage={i ? messages[i - 1] : { sendUserId: 0 }}
            right={
              user.id === room.roomOwner.id
                ? message.sendUserId === room.roomOwner.id
                : message.sendUserId !== room.roomOwner.id
            }
            isMe={user.id === message.sendUserId}
            isLast={
              i === messages.length - 1 ||
              [...messages].reverse()[i].sendUserId !== [...messages].reverse()[i + 1].sendUserId
            }
            admin={message.sendUserId === room.roomOwner.id}
            message={message}
            setReplyMessage={setReplyMessage}
            onReply={onReply}
          />
        ))}
        <div ref={chatEndRef}></div>
      </Box>
      <Box css={sendMessageForm}>
        {replyMessage && (
          <Box css={reply}>
            <Box>
              <Typography className="user">{replyMessage.sendUser.nickname}</Typography>
              <Typography className="content">{replyMessage.content}</Typography>
            </Box>
            <ClearIcon
              onClick={() => {
                setReplyMessage(null);
              }}
              className="clearIcon"
            />
          </Box>
        )}
        <Box css={{ display: 'flex' }}>
          <TextArea
            value={message}
            placeholder="여기에 입력해주세요"
            inputRef={inputRef}
            onChange={(e) => {
              if (e.target.value === '\n') return;
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (!e.shiftKey && e.key === 'Enter') {
                onSendMessage();
              }
            }}
            css={chatInput}
          />
          <Button variant="contained" onClick={onSendMessage} css={sendButton}>
            전송
          </Button>
        </Box>
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
  cursor: pointer;
`;

const menuWrapper = css`
  width: 8.34rem;
  height: 11.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  padding: 0;
  display: flex;
  flex-direction: column;
  .MuiListItem-root {
    padding: 0;
    flex: 1;
    .MuiTypography-root {
      font-family: 'Noto Sans KR';
      font-size: 1.167rem;
      text-align: center;
    }
    &:hover {
      .MuiTypography-root {
        font-weight: bold;
      }
    }
  }
`;

const chatWrapper = css`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  flex: 1;
  overflow: auto;
`;

const reply = css`
  border-bottom: 1px solid #bdbdbd;
  padding: 1rem 0;
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1rem;
  }
  .content {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 1rem;
    color: gray;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .clearIcon {
    cursor: pointer;
  }
`;

const sendMessageForm = css`
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;
`;

const chatInput = css`
  flex: 1;
  height: 10.84rem !important;
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

export default memo(Room);
