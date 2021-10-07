/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { getDateString } from '../../lib/util/dateFormat';
import Button from './Button';

const Comment = ({ user, comment, onDeleteComment }) => {
  const [content, setContent] = useState('');

  const onDelete = (commentId) => {
    onDeleteComment({ commentId });
  };

  return (
    <Grid container css={postCommentItem}>
      <Grid container className="avatarBox" justifyContent="center" alignItems="center">
        <Avatar
          src={comment.author.profile.profileImage.src}
          css={{ width: '50px', height: '50px' }}
        />
      </Grid>
      <Grid className="postCommentBody" container>
        {comment.author.id === user.id && (
          <Grid container justifyContent="flex-end">
            <Button>수정</Button>
            <Button onClick={() => onDelete(comment.id)}>삭제</Button>
          </Grid>
        )}
        <Grid container alignItems="center" css={{ marginTop: '10px' }}>
          <Typography className="nickname">{comment.author.nickname}</Typography>
          <Typography className="date">ㆍ {getDateString(comment.updatedAt)}</Typography>
        </Grid>
        <Typography className="postCommentContent">{comment.content}</Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;

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
