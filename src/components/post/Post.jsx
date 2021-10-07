/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Typography,
  Avatar,
  ClickAwayListener,
  Popper,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useState } from 'react';
import { ReactComponent as PostSetting } from '../../lib/assets/postSetting.svg';
import { getDateString } from '../../lib/util/dateFormat';
import { Paper } from '@material-ui/core';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import editorConfig from '../../lib/util/editorConfig';
import StatusIcon from './PostStatusIcon';

const Post = ({ post, channel, onEditPost, onDeletePost }) => {
  const [menuAnchor, setMenuAnchor] = useState();
  const handleMenuClick = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  const PostMenu = () => (
    <Popper open={!!menuAnchor} anchorEl={menuAnchor} placement="bottom">
      <ClickAwayListener
        onClickAway={() => {
          setMenuAnchor(null);
        }}
      >
        <Paper>
          <MenuList dense css={menuWrapper}>
            <MenuItem>
              <ListItemText>신고하기</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText onClick={onEditPost}>수정하기</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onDeletePost}>
              <ListItemText>삭제하기</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );

  return (
    <>
      <Box css={backgroudWrapper}>
        <Box css={postWrapper}>
          <Box css={postTitleWrapper}>
            <StatusIcon status={post.status} />
            <Typography className="title">{post.title}</Typography>
            <Box css={authorWrapper}>
              <Avatar
                src={post.author.profile.profileImage.src}
                css={authorIcon(post.authorId === channel.adminId)}
              />
              <Typography className="nickname">{post.author.nickname}</Typography>
              <Typography className="date">{getDateString(post.createdAt)}</Typography>
              <PostSetting css={menuButton} onClick={handleMenuClick} />
              <PostMenu />
            </Box>
          </Box>
        </Box>
        <Box css={postContentWrapper}>
          <Box css={editorConfig.editorCss}>
            <Viewer
              viewer={true}
              initialValue={post.content}
              customHTMLRenderer={editorConfig.renderer}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;

const backgroudWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
`;

const postWrapper = css`
  margin-top: 5rem;
  min-height: 12.5rem;
  height: fit-content;
  border-bottom: 1px solid #bdbdbd;
`;

const postTitleWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 1.875rem 1.875rem 1.25rem 1.875rem;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  .title {
    margin-top: 0.9375rem;
    font-style: normal;
    font-weight: bold;
    font-size: 2.125rem;
    color: #000000;
  }
  .nickname {
    margin-left: 0.5rem;
    font-style: normal;
    font-weight: 500;
    font-size: 0.9375rem;
    color: #000000;
  }
  .date {
    font-family: 'Noto Sans KR';
    margin-left: 1.875rem;
    font-style: normal;
    font-weight: 500;
    font-size: 0.9375rem;
  }
`;

const postContentWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.875rem;
`;

const authorWrapper = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.875rem;
  height: 3.4375rem;
`;

const authorIcon = (isAdmin) => css`
  width: 2.1875rem;
  height: 2.1875rem;
  border: ${isAdmin && '2px solid #04BD9E'};
`;

const menuButton = css`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  margin-left: 1.25rem;
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
