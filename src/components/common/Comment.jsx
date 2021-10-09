/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getCommentDateString } from '../../lib/util/dateFormat';
import Button from './Button';

const Comment = ({ user, comment, onDeleteComment, onEditComment }) => {
  const [newContent, setNewContent] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setNewContent(comment.content);
  }, [comment]);

  const onDelete = () => {
    onDeleteComment({ commentId: comment.id });
  };

  const onEditStart = () => {
    setEditMode(true);
  };

  const onEditCancel = () => {
    setEditMode(false);
    setNewContent(comment.content);
  };

  const onEdit = () => {
    onEditComment({ commentId: comment.id, content: newContent });
    setEditMode(false);
  };

  return (
    <Grid container css={postCommentItem}>
      <Grid container className="avatarBox" justifyContent="center" alignItems="center">
        <Avatar src={comment.author.profile.profileImage} css={{ width: '50px', height: '50px' }} />
      </Grid>
      <Grid className="postCommentBody" container>
        <Grid container justifyContent="flex-end" gap="10px">
          {comment.author.id === user.id ? (
            !editMode ? (
              <>
                <Button onClick={onEditStart}>수정</Button>
                <Button onClick={onDelete}>삭제</Button>
              </>
            ) : (
              <>
                <Button onClick={onEditCancel}>취소</Button>
                <Button onClick={onEdit}>완료</Button>
              </>
            )
          ) : (
            <>
              <Button>신고</Button>
            </>
          )}
        </Grid>
        <Grid container alignItems="center" css={{ marginTop: '10px' }}>
          <Typography className="nickname">{comment.author.nickname} ㆍ </Typography>
          <Typography className="date">
            {getCommentDateString(comment.createdAt, comment.updatedAt)}
          </Typography>
        </Grid>
        {!editMode ? (
          <Typography className="postCommentContent">{comment.content}</Typography>
        ) : (
          <textarea
            placeholder="댓글을 수정해주세요."
            css={editTextarea}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        )}
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
      font-size: 14px;
      color: #5f5f5f;
    }
    .postCommentContent {
      margin-top: 10px;
      flex: 1;
    }
  }
`;

const editTextarea = css`
  margin: 10px;
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
`;
