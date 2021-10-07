/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import Button from './Button';
import Comment from '../../components/common/Comment';

const Comments = ({ user, comments = [], onWriteComment, onDeleteComment, onEditComment }) => {
  const [content, setContent] = useState('');

  const onWrite = () => {
    onWriteComment({ content });
    setContent('');
  };

  return (
    <Grid container alignItems="center" css={postCommentWrapper}>
      <Typography className="postCommentHeader">댓글 {comments?.length}</Typography>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          user={user}
          comment={comment}
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment}
        />
      ))}
      <Grid container css={postCommentWrite}>
        <textarea
          placeholder="댓글을 입력해주세요."
          className="commentWrite"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="commentSubmit" onClick={onWrite}>
          등록
        </Button>
      </Grid>
    </Grid>
  );
};

export default Comments;

const postCommentWrapper = css`
  padding: 0 calc((100% - 71.25rem) / 2);
  background: #fafafc;

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
