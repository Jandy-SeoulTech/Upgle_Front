/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Grid, Avatar} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Button from './../common/Button';

const ChannelPostList = ({ postList }) => {

  return (
    <Grid container css={backgroudWrapper}>
      <Grid item css={{width: '1200px'}}>
        <Box css={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '70px'}}>
          <Typography css={pageTitle}>게시판</Typography>
          <Button css={write}>글 작성</Button>
        </Box>
        <Box css={postListWrapper}>
          {postList.map((post) => (
            <Box css={postItem}>
              <Box css={postItemTitle}>
                <Box css={{display: 'flex'}}>
                  <Typography css={{paddingRight: '30px'}}>{post.title}</Typography>
                  <Avatar src={post.author.profile.profileImage.src} css={{width: '20px', height: '20px', margin: 'auto'}}/>
                  <Typography css={{ fontSize: '15px !important', textAlign: 'center'}}>{post.author.nickname}</Typography>
                </Box>
                <Typography>{post.updatedAt}</Typography>
              </Box>
              <Typography css={postContent}>{post.content}</Typography>

            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}

const backgroudWrapper = css`
  margin-top: 120px;
  justify-content: center;
`;

const pageTitle = css`
  margin: 10px;
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 30px;
`;

const write = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 15px;
  padding : 10px;
  margin: 10px;
`;

const postListWrapper = css`
  margin: 10px;
  padding: 10px;
  background-color: #FAFAFC;
  width: 1200px;
  height: calc(100vh - 210px);
  display: flex;
  flex-direction: column;
`;

const postItem = css`
  width: 800px;
  height: 100px;
  margin: auto;
  background-color: #F0F0F0;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
`;

const postItemTitle = css`
  display: flex;
  justify-content: space-between;
  .MuiTypography-root {
    margin: 10px;
    font-size: 20px;
  }
`;

const postContent = css`
  width: calc(100% - 20px);
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Barlow', 'Noto Sans KR';
  margin: 0 0 10px 10px;
`;



export default ChannelPostList;