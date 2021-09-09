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
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Button from './../common/Button';
import { ReactComponent as PostSetting } from '../../lib/assets/postSetting.svg';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as ChatMake } from '../../lib/assets/chatMake.svg';
import { ReactComponent as ChatGo } from '../../lib/assets/chatGo.svg';
import { getDateString } from '../../lib/util/dateFormat';
import palette from '../../lib/styles/palette';
import TextField from './../common/TextField';
import { Paper } from '@material-ui/core';
import { useCallback } from 'react';

const ChannelPost = ({
  post,
  channel,
  user,
  isLiked,
  onLikeChannel,
  onUnLikeChannel,
}) => {
  const [menuAnchor, setMenuAnchor] = useState();
  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  const handleMoveChat = (roomId) => {
    window.open(
      `/chat/${roomId}`,
      '_blank',
      'width=600, height=900, toolbars=no, scrollbars=yes',
    );
    return false;
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
          {isLiked ? (
            <LikedButton className="icon" />
          ) : (
            <LikeIcon className="icon" />
          )}
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
            <Button className="makeChat">
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
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        css={{ width: '1140px' }}
      >
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
              <Typography className="nickname">
                {post.author.nickname}
              </Typography>
              <Typography className="date">
                {getDateString(post.updatedAt)}
              </Typography>
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
                  <Popper
                    open={!!menuAnchor}
                    anchorEl={menuAnchor}
                    placement="bottom-end"
                  >
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
        <Grid container alignItems="center" css={postCommentWrapper}>
          <Typography className="postCommentHeader">
            댓글 {post.comment.length}
          </Typography>
          {post.comment.map((comment) => {
            return (
              <Grid container css={postCommentItem}>
                <Grid
                  container
                  className="avatarBox"
                  justifyContent="center"
                  alignItems="center"
                >
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
                  <Grid
                    container
                    alignItems="center"
                    css={{ marginTop: '20px' }}
                  >
                    <Typography className="nickname">
                      {comment.author.nickname}
                    </Typography>
                    <Typography className="date">
                      ㆍ {getDateString(comment.updatedAt)}
                    </Typography>
                  </Grid>
                  <Typography className="postCommentContent">
                    {comment.content}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Grid container css={postCommentWrite}>
            <textarea
              placeholder="댓글을 입력해주세요."
              className="commentWrite"
            />
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
