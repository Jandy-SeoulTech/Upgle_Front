/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  ClickAwayListener,
  Popper,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
  Checkbox,
} from '@material-ui/core';
import { useState } from 'react';
import Button from './../common/Button';
import { ReactComponent as PostSetting } from '../../lib/assets/postSetting.svg';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as ChatMake } from '../../lib/assets/chatMake.svg';
import { ReactComponent as ChatGo } from '../../lib/assets/chatGo.svg';
import { getDateString } from '../../lib/util/dateFormat';
import palette from '../../lib/styles/palette';
import { Paper } from '@material-ui/core';
import { useCallback } from 'react';
import Modal from '../common/Modal';
import { TextField as MuiTextField } from '@material-ui/core';
import { TextField } from '../TextField';
import Clear from '@material-ui/icons/Clear';

const ChannelPost = ({
  post,
  channel,
  user,
  isLiked,
  onLikeChannel,
  onUnLikeChannel,
  onCreateRoom,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isReserve, setIsReserve] = useState(false);
  const [reserveDate, setReserveDate] = useState();
  const [menuAnchor, setMenuAnchor] = useState();
  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  const handleMoveChat = (roomId) => {
    window.open(`/chat/${roomId}`, '_blank', 'width=600, height=900, toolbars=no, scrollbars=yes');
    return false;
  };

  const handleCreateRoom = () => {
    onCreateRoom({
      status: isReserve ? 'Reservation' : 'Open',
      name: roomName,
      reservedTime: isReserve ? reserveDate : null,
    });
  };

  const StatusIcon = ({ status }) => {
    let statusIconCss, statusIconText;
    switch (status) {
      case 'Notice':
        statusIconCss = [statusCss, { backgroundColor: '#FF1F00' }];
        statusIconText = '공지';
        break;
      case 'Open':
        statusIconCss = [statusCss, { backgroundColor: '#FF511B' }];
        statusIconText = '채팅 오픈';
        break;
      case 'Reservation':
        statusIconCss = [statusCss, { backgroundColor: '#5F5F5F' }];
        statusIconText = '채팅 예약';
        break;
      default:
        return <></>;
    }
    return (
      <div css={statusIconCss}>
        <p>{statusIconText}</p>
      </div>
    );
  };

  const AuthorIcon = useCallback(() => {
    const baseIcon = css`
      width: 35px;
      height: 35px;
    `;
    let authorIcon;
    if (post.authorId === channel.adminId) {
      authorIcon = [baseIcon, { border: '2px solid #04BD9E' }];
    } else {
      authorIcon = baseIcon;
    }
    return (
      <>
        <Avatar src={post.author.profile.profileImage.src} css={authorIcon} />
      </>
    );
  }, [post]);

  const ControllButtonList = ({ status }) => {
    const SympathyButton = ({}) => {
      return (
        <Button
          className={isLiked ? 'likedButton' : 'likeButton'}
          onClick={isLiked ? onUnLikeChannel : onLikeChannel}
        >
          {isLiked ? <LikedButton className="icon" /> : <LikeIcon className="icon" />}
          공감
        </Button>
      );
    };
    let ChatControllButton = ({}) => <></>;
    switch (status) {
      case 'Open':
        ChatControllButton = ({}) => {
          return (
            <Button
              className="goChat"
              onClick={() => {
                handleMoveChat(1);
              }}
            >
              <ChatGo className="icon" />
              채팅방 바로 가기
            </Button>
          );
        };
        break;
      case 'Close':
        ChatControllButton = ({}) => {
          return (
            <Button
              className="makeChat"
              onClick={() => {
                setCreateModalOpen(true);
              }}
            >
              <ChatMake className="icon" />
              채팅방 만들기
            </Button>
          );
        };
        break;
      case 'Reservation':
        ChatControllButton = ({}) => {
          return <></>;
        };
        break;
      default:
        return <></>;
    }

    return (
      <Grid container justifyContent="flex-end" css={controllButtonWrapper}>
        <SympathyButton />
        <ChatControllButton />
      </Grid>
    );
  };

  return (
    <Grid container justifyContent="center" css={backgroudWrapper}>
      <Grid container alignItems="center" flexDirection="column" css={{ width: '1140px' }}>
        <Box
          css={{
            marginTop: '80px',
            width: '1140px',
            minHeight: '200px',
            height: 'fit-content',
            borderBottom: '1px solid #BDBDBD',
          }}
        >
          <Grid container flexDirection="column" css={postTitleWrapper}>
            <StatusIcon status={post.status} />
            <Typography className="title">{post.title}</Typography>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              css={{ paddingRight: '30px', height: '55px' }}
            >
              <AuthorIcon />
              <Typography className="nickname">{post.author.nickname}</Typography>
              <Typography className="date">{getDateString(post.updatedAt)}</Typography>
              <ClickAwayListener
                onClickAway={() => {
                  setMenuAnchor(null);
                }}
              >
                <Box
                  css={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: '20px',
                  }}
                  onClick={handleMenu}
                >
                  <PostSetting css={{ width: '100%', height: '100%' }} />
                  <Popper open={!!menuAnchor} anchorEl={menuAnchor} placement="bottom-end">
                    <Paper>
                      <MenuList dense css={menuWrapper}>
                        <MenuItem>
                          <ListItemText>신고하기</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <ListItemText>수정하기</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {}}>
                          <ListItemText>삭제하기</ListItemText>
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </Popper>
                </Box>
              </ClickAwayListener>
            </Grid>
          </Grid>
        </Box>
        <Box css={postContentWrapper}>
          <Typography>{post.content}</Typography>
          <ControllButtonList status={post.status} />
        </Box>
        <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
          <Paper css={createRoomModal}>
            <Box css={modalTitle}>
              <Typography>채팅방 만들기</Typography>
              <Clear
                onClick={() => {
                  setCreateModalOpen(false);
                }}
              />
            </Box>
            <Box css={modalContent}>
              <Box css={modalForm}>
                <Typography>채팅방 이름</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  maxLength={20}
                  fullWidth
                />
              </Box>
              <Box css={modalForm}>
                <Typography>예약 하기</Typography>
                <Checkbox
                  checked={isReserve}
                  onChange={(e) => {
                    setIsReserve(e.target.checked);
                  }}
                />
              </Box>
              <Box css={modalForm}>
                <Typography>예약 시간</Typography>
                <MuiTextField
                  type="datetime-local"
                  sx={{ width: 300 }}
                  value={reserveDate}
                  disabled={!isReserve}
                  onChange={(e) => {
                    setReserveDate(e.target.value);
                    console.log(reserveDate);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box css={modalButtonGroup}>
                <Button
                  css={modalButton}
                  disabled={!roomName || isReserve}
                  onClick={handleCreateRoom}
                >
                  바로 열기
                </Button>
                <Button
                  css={modalButton}
                  disabled={!roomName || !isReserve || !reserveDate}
                  onClick={handleCreateRoom}
                >
                  예약 하기
                </Button>
              </Box>
            </Box>
          </Paper>
        </Modal>
        <Grid container alignItems="center" css={postCommentWrapper}>
          <Typography className="postCommentHeader">댓글 {post.comment.length}</Typography>
          {post.comment.map((comment) => {
            return (
              <Grid container css={postCommentItem}>
                <Grid container className="avatarBox" justifyContent="center" alignItems="center">
                  <Avatar
                    src={comment.author.profile.profileImage.src}
                    css={{ width: '50px', height: '50px' }}
                  />
                </Grid>
                <Grid className="postCommentBody" container>
                  {comment.author.nickname === user.nickname && (
                    <Grid container justifyContent="flex-end">
                      <Button>수정</Button>
                      <Button>삭제</Button>
                    </Grid>
                  )}
                  <Grid container alignItems="center" css={{ marginTop: '20px' }}>
                    <Typography className="nickname">{comment.author.nickname}</Typography>
                    <Typography className="date">ㆍ {getDateString(comment.updatedAt)}</Typography>
                  </Grid>
                  <Typography className="postCommentContent">{comment.content}</Typography>
                </Grid>
              </Grid>
            );
          })}
          <Grid container css={postCommentWrite}>
            <textarea placeholder="댓글을 입력해주세요." className="commentWrite" />
            <Button className="commentSubmit">등록</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const backgroudWrapper = css`
  margin-top: 135px;
  margin-bottom: 100px;
  background: #fafafc;
`;

const postTitleWrapper = css`
  padding: 30px 30px 20px 30px;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  .title {
    margin-top: 15px;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    color: #000000;
  }
  .nickname {
    margin-left: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    color: #000000;
  }
  .date {
    font-family: 'Noto Sans KR';
    margin-left: 30px;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
  }
`;

const statusCss = css`
  width: 80px;
  height: 34px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: bold;
    font-size: 15px;
    color: #ffffff;
  }
`;

const postContentWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.2px;
    color: #000000;
  }
`;

const createRoomModal = css`
  width: 50rem;
  height: 28.125rem;
  background-color: white;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const modalTitle = css`
  height: 3.75rem;
  padding: 0 1.34375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  .MuiTypography-root {
    height: 100%;
    line-height: 3.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1rem;
  }
`;

const modalContent = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 7.5rem;
`;

const modalForm = css`
  display: flex;
  height: 2.25rem;
  align-items: center;
  .MuiTypography-root {
    width: 6.875rem;
    height: 100%;
    flex-shrink: 0;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
  .MuiButtonBase-root {
    margin: 0;
    width: 1.25rem;
    height: 1.25rem;
  }
  .MuiFormControl-root {
    height: 2.25rem;
  }
  & + & {
    margin-top: 2.1875rem;
  }
`;

const modalButtonGroup = css`
  width: 100%;
  margin-top: 4.375rem;
  display: flex;
  justify-content: space-between;
`;

const modalButton = css`
  width: 15.625rem;
  height: 3.5625rem;
  background: black;
  color: white;
  :disabled {
    background: #e0e0e0;
    color: #5f5f5f;
  }
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 10px;
`;

const controllButtonWrapper = css`
  margin-top: 180px;
  & .MuiButton-root {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    height: 50px;
    margin-left: 20px;
  }

  .likedButton {
    width: 105px;
    background: ${palette.white};
    color: ${palette.orange};
    border-radius: 50px;
    border: 2px solid ${palette.orange};
    &:hover {
      filter: brightness(0.85);
    }
  }
  .likeButton {
    width: 105px;
    color: ${palette.black};
    background: ${palette.white};
    border: 2px solid ${palette.black};
    border-radius: 50px;
    &:hover {
      filter: brightness(0.95);
    }
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.625rem;
  }
  .goChat {
    width: 195px;
    color: ${palette.white};
    background: ${palette.orange};
    border-radius: 100px;
    &:hover {
      filter: brightness(0.95);
    }
  }
  .makeChat {
    width: 180px;
    color: ${palette.white};
    background: ${palette.black};
    border-radius: 100px;
    &:hover {
      filter: brightness(0.95);
    }
  }
`;

const postCommentWrapper = css`
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  .postCommentHeader {
    padding: 20px 0 20px 30px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
  }
`;

const postCommentItem = css`
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  & .MuiButton-root {
    font-family: 'Barlow', 'Noto Sans KR';
    font-size: 12px;
    width: '40px';
    height: '20px';
  }
  .avatarBox {
    width: 110px;
    height: 130px;
  }
  .postCommentBody {
    padding: 10px 10px 40px 10px;
    min-height: 130px;
    flex: 1;
    .nickname {
      font-size: 14px;
      color: #000000;
    }
    .date {
      margin-left: 10px;
      font-size: 14px;
      color: #5f5f5f;
    }
    .postCommentContent {
      margin-top: 10px;
      flex: 1;
    }
  }
`;

const postCommentWrite = css`
  margin: 50px 10px 50px 110px;
  flex-direction: column;
  .commentWrite {
    flex: 1;
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 15px;
    resize: vertical;
    padding: 30px;
    width: 100%;
    min-height: 190px;
    outline: 1px solid rgba(0, 0, 0, 0);
    background: #fafafc;
    border: 2px solid #bdbdbd;
    border-radius: 10px;
  }
  .commentSubmit {
    margin: 10px 0px 10px auto;
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 600;
    font-size: 18px;
    color: #7b7b7b;
    border: 2px solid #bdbdbd;
    border-radius: 25px;
  }
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

export default ChannelPost;
