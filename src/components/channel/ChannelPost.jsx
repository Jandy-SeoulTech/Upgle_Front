/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Grid, Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Button from './../common/Button';
import { ReactComponent as PostSetting } from '../../lib/assets/postSetting.svg';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as ChatMake } from '../../lib/assets/chatMake.svg';
import { ReactComponent as ChatGo } from '../../lib/assets/chatGo.svg';
import { getDateString } from '../../lib/util/dateFormat';
import palette from '../../lib/styles/palette';

const ChannelPost = ({
  post,
  channel,
  isLiked,
  onLikeChannel,
  onUnLikeChannel,
}) => {

  const StatusIcon = ({ status }) => {
    let statusIconCss, statusIconText;
    switch (status) {
      case 'Notice':
        statusIconCss = [statusCss, { backgroundColor: '#FF1F00' }];
        statusIconText = '공지'
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
        return (<></>);
    }
    return (
      <div css={statusIconCss}>
        <p>{statusIconText}</p>
      </div>
    );
  }

  const AuthorIcon = () => {
    const baseIcon = css`
      width: 35px;
      height: 35px;
    `;
    let authorIcon;
    if (post.authorId === channel.adminId) {
      authorIcon = [baseIcon, { border: '2px solid #04BD9E' }];
    }
    else {
      authorIcon = baseIcon;
    }
    return (
      <>
        <Avatar src={post.author.profile.profileImage.src} css={authorIcon} />
      </>
    )
  }

  const ControllButtonList = ({ status }) => {
    const SympathyButton = ({ }) => {
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
      )
    }
    let ChatControllButton = ({ }) => (<></>);
    switch (status) {
      case 'Open':
        ChatControllButton = ({ }) => {
          return (
            <Button className='goChat'>
              <ChatGo className="icon" />
              채팅방 바로 가기
            </Button>
          )
        }
        break;
      case 'Close':
        ChatControllButton = ({ }) => {
          return (
            <Button className='makeChat'>
              <ChatMake className="icon" />
              채팅방 만들기
            </Button>
          )
        }
        break;
      case 'Reservation':
        ChatControllButton = ({ }) => {
          return (<></>)
        }
        break;
      default:
        return (<></>);
    }

    return (
      <Grid container justifyContent="flex-end" css={controllButtonWrapper}>
        <SympathyButton />
        <ChatControllButton />
      </Grid>
    )

  }

  return (
    <Grid container justifyContent="center" css={backgroudWrapper}>
      <Grid container alignItems="center" flexDirection="column" css={{width: '1140px'}}>
        <Box css={{ marginTop: '80px', width: '1140px', minHeight: '200px', height: 'fit-content', borderBottom: '1px solid #BDBDBD' }}>
          <Grid container flexDirection="column" css={postTitleWrapper}>
            <StatusIcon status={post.status} />
            <Typography className='title'>{post.title}</Typography>
            <Grid container justifyContent='flex-end' alignItems='center' css={{ paddingRight: '30px', height: '55px' }}>
              <AuthorIcon />
              <Typography className='nickname'>{post.author.nickname}</Typography>
              <Typography className='date'>{getDateString(post.updatedAt)}</Typography>
              <PostSetting css={{ width: '24px', height: '24px', marginLeft: '20px' }} onClick={() => { }} />
            </Grid>
          </Grid>
        </Box>
        <Box css={postContentWrapper}>
          <Typography>
            {post.content}
          </Typography>
          <ControllButtonList status={post.status}/>
        </Box>
        <Grid container alignItems='center' css={postCommentWrapper}>
          <Typography className='postCommentHeader'>댓글 {post.comment.length}</Typography>
          {post.comment.map((comment) => {

            return (
              <Grid container alignItems='center' css={postCommentItem}>
                <Grid container className='avatarBox' justifyContent='center' alignItems='center'>
                  <Avatar src={comment.author.profile.profileImage.src} css={{ width: '50px', height: '50px'}} />
                </Grid>
                <Grid className='postCommentBody' container>
                  <Grid container justifyContent='flex-end'>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                  </Grid>
                  <Grid container alignItems='center'>
                    <Typography className='nickname'>{comment.author.nickname}</Typography>
                    <Typography className='date'>ㆍ  {getDateString(comment.updatedAt)}</Typography>
                  </Grid>
                  <Typography className='postCommentContent'>
                    {comment.content}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}

        </Grid>


      </Grid>
    </Grid>
  )
}

const backgroudWrapper = css`
  margin-top: 135px;
  margin-bottom: 100px;
  background: #FAFAFC;
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
    color: #FF0000;

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
    color: #FFFFFF;
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
  border-top: 1px solid #BDBDBD;
  border-bottom: 1px solid #BDBDBD;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }

  .avatarBox {
    width: 110px;
    height: 130px;
  }
  .postCommentBody {
    padding: 10px 10px 10px 40px;
    flex: 1;
    .nickname {
      font-size: 14px;
      color: #000000;

    }
    .date {
      margin-left: 10px;
      font-size: 14px;
      color: #5F5F5F;
    }
    .postCommentContent {
      min-height: 130px;
      flex: 1;

    }

  }

`;


export default ChannelPost;