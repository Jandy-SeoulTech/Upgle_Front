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
import RoomChatItem from './RoomChatItem';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';
import { ReactComponent as Hamburger } from '../../lib/assets/hamburger.svg';
import { ReactComponent as Good } from '../../lib/assets/good.svg';
import { ReactComponent as Soso } from '../../lib/assets/soso.svg';
import { ReactComponent as Bad } from '../../lib/assets/bad.svg';
import ClearIcon from '@material-ui/icons/Clear';
import Modal from '../common/Modal';

const ChattingRoom = ({
  user,
  room,
  messages,
  message,
  setMessage,
  handleSendMessage,
  handleGetMassage,
  replyMessage,
  setReplyMessage,
  handleReview,
  participants,
}) => {
  const [reviewToglle, setReviewToglle] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();
  const [review, setReview] = useState('');
  const [rate, setRate] = useState();
  const chatEndRef = useRef();
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

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <Box css={chatListWrapper}>
      <Modal open={reviewToglle} setOpen={setReviewToglle}>
        <Paper css={reviewModal}>
          <Typography align="center">
            {room.roomOwner.nickname}님에 대한 리뷰를 남겨주세요
          </Typography>
          <Box css={reviewRate(rate)}>
            <Box
              className="good"
              onClick={() => {
                setRate('good');
              }}
            >
              <Good className="icon" />
              좋아요
            </Box>
            <Box
              className="soso"
              onClick={() => {
                setRate('soso');
              }}
            >
              <Soso className="icon" />
              보통이에요
            </Box>
            <Box
              className="bad"
              onClick={() => {
                setRate('bad');
              }}
            >
              <Bad className="icon" />
              별로에요
            </Box>
          </Box>
          <TextArea
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            maxLength={100}
            minRows={5}
            css={reviewInput}
          />
          <Box css={buttonWrapper}>
            <Button
              className="cancel"
              onClick={() => {
                setReviewToglle(false);
              }}
            >
              취소
            </Button>
            <Button
              className="exit"
              disabled={!rate || !review}
              onClick={() => {
                handleReview({ review, rate });
              }}
            >
              나가기
            </Button>
          </Box>
        </Paper>
      </Modal>
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
          <Box css={[navItem, { background: `#FFFFFF33`, color: '#BDBDBD' }]}>
            화면
          </Box>
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
                <Popper
                  open={!!menuAnchor}
                  anchorEl={menuAnchor}
                  placement="bottom-end"
                >
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
                      <MenuItem
                        onClick={() => {
                          setReviewToglle(true);
                        }}
                      >
                        <ListItemText>나가기</ListItemText>
                      </MenuItem>
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
          <RoomChatItem
            key={message.id}
            isContinue={
              i > 0 &&
              [...messages].reverse()[i - 1].sendUserId === message.sendUserId
            }
            prevMessage={i ? messages[i - 1] : { sendUserId: 0 }}
            right={
              user.id === room.roomOwner.id
                ? message.sendUserId === room.roomOwner.id
                : message.sendUserId !== room.roomOwner.id
            }
            isMe={user.id === message.sendUserId}
            isLast={
              i === messages.length - 1 ||
              [...messages].reverse()[i].sendUserId !==
                [...messages].reverse()[i + 1].sendUserId
            }
            admin={message.sendUserId === room.roomOwner.id}
            message={message}
            setReplyMessage={setReplyMessage}
          />
        ))}
        <div ref={chatEndRef}></div>
      </Box>
      <Box css={sendMessageForm}>
        {replyMessage && (
          <Box css={reply}>
            <Box>
              <Typography className="user">
                {replyMessage.sendUser.nickname}
              </Typography>
              <Typography className="content">
                {replyMessage.content}
              </Typography>
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
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (!e.shiftKey && e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            onKeyUp={(e) => {
              if (!e.shiftKey && e.key === 'Enter') setMessage('');
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
    </Box>
  );
};

const chatListWrapper = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const reviewModal = css`
  width: 37.5rem;
  height: 38.5rem;
  background: ${palette.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  & .MuiTypography-root {
    font-family: 'Noto Sans KR';
    font-weight: bold;
    font-size: 1.167rem;
  }
`;

const reviewRate = (rate) => css`
  display: flex;
  justify-content: center;
  margin-top: 5.041rem;
  .MuiBox-root {
    border: 2px solid #e0e0e0;
    border-radius: 50px;
    padding: 0.83rem 1.25rem;
    display: flex;
    align-items: center;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1.167rem;
    cursor: pointer;
  }
  .MuiBox-root + .MuiBox-root {
    margin-left: 1.25rem;
  }
  .icon {
    width: 2.083rem;
    height: 2.083rem;
    margin-right: 0.833rem;
  }
  .good {
    color: ${rate === 'good' ? '#ff511b' : '#a0a0a0'};
    border: ${rate === 'good' && '2px solid #ff511b;'};
    &:hover {
      color: #ff511b;
      border: 2px solid #ff511b;
    }
  }
  .soso {
    color: ${rate === 'soso' ? '#04bd9e' : '#a0a0a0'};
    border: ${rate === 'soso' && '2px solid #04bd9e;'};
    &:hover {
      color: #04bd9e;
      border: 2px solid #04bd9e;
    }
  }
  .bad {
    color: ${rate === 'bad' ? 'black' : '#a0a0a0'};
    border: ${rate === 'bad' && '2px solid black;'};
    &:hover {
      color: black;
      border: 2px solid black;
    }
  }
`;

const reviewInput = css`
  margin-top: 2.5rem;
  width: 30.5rem;
  height: 14.58rem;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  font-size: 1rem;
  outline: none !important;
  &:focus-visible {
    outline: none !important;
    border: 2px solid black;
  }
`;

const buttonWrapper = css`
  display: flex;
  justify-content: center;
  .MuiButton-root {
    margin-top: 5rem;
    width: 13.3rem;
    height: 4.75rem;
    font-family: 'Noto Sans KR';
    font-weight: bold;
    font-size: 1.66rem;
    border-radius: 10px;
    border: none;
  }
  .MuiButton-root + .MuiButton-root {
    margin-left: 3.75rem;
  }
  .cancel {
    background: black;
    color: white;
  }
  .exit {
    background: #ff511b;
    color: white;
    &:disabled {
      background: #e0e0e0;
      color: #5f5f5f;
    }
  }
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
    width: 44rem;
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

export default memo(ChattingRoom);
