/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import postStatus from '../../lib/util/postStatus';
import Button from '../common/Button';

const PostCard = ({ post }) => {
  return (
    <Box css={postCardWrapper}>
      <Box>
        <Typography className="title">{post.title}</Typography>
        <Box css={{ display: 'flex' }}>
          <Typography className="author">{post.author.nickname}</Typography>
          <Typography className="date">
            {'ㆍ'}
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Box css={buttonWrapper}>
        <Button className={post.status}>{postStatus[post.status].name}</Button>
      </Box>
    </Box>
  );
};

const postCardWrapper = css`
  width: 34.375rem;
  height: 3.75rem;
  padding: 0.6875rem 1.5625rem;
  display: flex;
  justify-content: space-between;
  & + & {
    border-top: 1px solid #e0e0e0;
  }

  .title {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.875rem;
  }
  .author {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.625rem;
    color: #5f5f5f;
  }

  .date {
    font-weight: 500;
    font-size: 0.625rem;
    color: #5f5f5f;
  }
`;

const buttonWrapper = css`
  .MuiButton-root {
    width: 4.5rem;
    height: 1.625rem;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.3125rem 0.625rem;
    border-radius: 20px;
    border: none;
  }
  .Open {
    color: white;
    background: #ff511b;
  }
  .Close {
    display: none;
  }
  .Notice {
    display: none;
  }
  .Reservation {
    color: white;
    background: #5f5f5f;
  }
`;

export default PostCard;
