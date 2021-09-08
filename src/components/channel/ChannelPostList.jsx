/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Grid, Avatar} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Button from './../common/Button';
import { ReactComponent as PostWrite } from '../../lib/assets/postWrite.svg';
import { getDataString } from '../../lib/util/dateFormat';

const ChannelPostList = ({ postList, channel }) => {


  const StatusIcon = ({ status }) => {
    let statusIconCss, statusIconText;
    switch (status) {
      case 'Notice':
        statusIconCss = [statusCss, { backgroundColor: '#FF1F00'}];
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

  return (
    <Grid container css={backgroudWrapper}>
      <Grid item css={{width: '1200px'}}>
        <Box css={writeTitleWrapper}>
          <Button css={write}>
            <PostWrite className="icon" css={{marginRight: '10px'}}/>
            요청하기
          </Button>
          <Typography css={writeTitle}>
            재능과 관련하여 배우고 싶은 내용을 요청해보세요. 재능 고수들이 공유 채팅을 열어 재능 업글을 도와줄거예요!
          </Typography>
        </Box>
        <Box css={postListWrapper}>
          {postList.map((post) => (
            <Box css={postItem}>
              <Box css={postItemRight}>
                <Box css={postTitle}>
                  <Box css={{ display: 'flex' }}>
                    <StatusIcon status={post.status} />
                    <Typography className='title'>{post.title}</Typography>
                  </Box>
                  <Typography className='date'>{getDataString(post.updatedAt)}</Typography>
                </Box>
                <Typography css={postContent}>{post.content}</Typography>
              </Box>

              <Box css={postItemLeft}>
                {post.authorId === channel.adminId ?
                  <>
                    <div css={adminIconCss}>
                      <p>관리자</p>
                    </div>
                    <Avatar src={post.author.profile.profileImage.src} css={{width: '50px', height: '50px', margin: '5px auto 0 auto', border: '2px solid #04BD9E'}} />
                  </>
                  :
                  <>
                    <Avatar src={post.author.profile.profileImage.src} css={{ width: '50px', height: '50px', margin: '0 auto' }} />
                  </>
                }
                <Typography css={nicknameCss}>{post.author.nickname}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}

const statusCss = css`
  width: 72px;
  height: 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-size: 13px;
    font-weight: 700;
    color: #FFFFFF;
  }
`;


const backgroudWrapper = css`
  margin-top: 135px;
  margin-bottom: 100px;
  justify-content: center;
  background: #FAFAFC;
`;

const writeTitleWrapper = css`
  display: flex;
  flex-direction: column;
  margin: 80px 0 80px 0;
`;

const write = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: bold;
  font-size: 20px;
  color: #FFFFFF;
  background: #000000;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 159.28px;
  height: 55px;
  margin: auto;
`;

const writeTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  margin: 30px auto auto auto;
`;

const postListWrapper = css`
  width: 1140px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const postItem = css`
  width: 100%;
  height: 170px;
  margin: auto;
  border-bottom: 1px solid #BDBDBD;
  display: flex;
  align-items: flex-start;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
`;

const postItemRight = css`
  width: 960px;
  height: 170px;
  padding: 0;
  margin: 0;
`;

const postItemLeft = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 180px;
  height: 170px;
  padding: 0;
  margin: 0;
`;

const postTitle = css`
  width: 930px;
  height: 25px;
  margin: 32px 0 10px 30px;
  display: flex;
  justify-content: space-between;
  & .MuiTypography-root {
    padding-left: 15px;
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
  }
  .title {
    font-weight: 600;
    font-size: 20px;
  }
  .date {
    font-size: 14px;
    line-height: 22px;
    color: #5F5F5F;
  }
`;

const postContent = css`
  width: 910px;
  height: 44px;
  margin: 23px 10px 0 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #5F5F5F;
`;


const adminIconCss = css`
  width: 38px;
  height: 18px;
  background: #04BD9E;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #FFFFFF;
  }
`;

const nicknameCss = css`
  margin-top: 12px;
  text-align: center;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  font-size: 13px;
  color: #000000;
`;


export default ChannelPostList;