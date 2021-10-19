/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Typography,
  Avatar,
  ClickAwayListener,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useState } from 'react';
import { ReactComponent as PostSetting } from '../../lib/assets/postSetting.svg';
import { getDateString } from '../../lib/util/dateFormat';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import editorConfig from '../../lib/util/editorConfig';
import ArchiveStatusIcon from './ArchiveStatusIcon';

const Archive = ({ userId, channel, archive, onEditArchive, onDeleteArchive }) => {
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
            {userId === archive.ownerId && (
              <>
                <Divider />
                <MenuItem>
                  <ListItemText onClick={onEditArchive}>수정하기</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText onClick={onDeleteArchive}>삭제하기</ListItemText>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );

  return (
    <Box css={backgroundWrapper}>
      <Box css={archiveWrapper}>
        <Box css={archiveTitleWrapper}>
          {archive.postId && <ArchiveStatusIcon />}
          <Typography className="title">{archive.title}</Typography>
          <Box css={ownerWrapper}>
            <Avatar
              src={archive.owner.profile.profileImage}
              css={ownerIcon(archive.ownerId === channel.adminId)}
            />
            <Typography className="nickname">{archive.owner.nickname}</Typography>
            <Typography className="date">{getDateString(archive.createdAt)}</Typography>
            <PostSetting css={menuButton} onClick={handleMenuClick} />
            <PostMenu />
          </Box>
        </Box>
      </Box>
      <Box css={archiveContentWrapper}>
        <Box css={editorConfig.editorCss}>
          <Viewer
            viewer={true}
            initialValue={archive.content}
            customHTMLRenderer={editorConfig.renderer}
          />
        </Box>
        <Box css={tagsCss}>
          {archive.tags.map((tag) => (
            <Typography key={tag.id} css={tagCss}>
              {tag.tag.name}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const backgroundWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
`;

const archiveWrapper = css`
  margin-top: 5rem;
  height: fit-content;
  border-bottom: 1px solid #bdbdbd;
`;

const archiveTitleWrapper = css`
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

const archiveContentWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.875rem;
`;

const ownerWrapper = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.875rem;
  height: 3.4375rem;
`;

const ownerIcon = (isAdmin) => css`
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
  max-height: 11.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  padding: 0;
  display: flex;
  flex-direction: column;
  .MuiListItem-root {
    padding: 0;
    flex: 1;
    min-height: 3.4375rem;
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

const tagsCss = css`
  display: flex;
  row-gap: 0.625rem;
  column-gap: 1.75rem;
  flex-wrap: wrap;
  margin-top: 12.5rem;
`;

const tagCss = css`
  font-size: 1.125rem;
  color: #7b7b7b;
  ::before {
    content: '#';
  }
`;

export default Archive;
