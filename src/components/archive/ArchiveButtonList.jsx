/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as PostGo } from '../../lib/assets/postGo.svg';
import { Box, Button } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import { useHistory } from 'react-router';

const ArchiveButtonList = ({ archive, isLiked, onLikeArchive, onUnlikeArchive }) => {
  const history = useHistory();
  return (
    <Box css={wrapper}>
      <Box css={{ marginRight: '1.875rem' }}>
        <Button
          css={likeButton(isLiked)}
          onClick={() => {
            isLiked ? onUnlikeArchive() : onLikeArchive();
          }}
        >
          {isLiked ? <LikedButton className="icon" /> : <LikeIcon className="icon" />}
          공감
        </Button>

        {archive.postId && (
          <Button
            css={goPostButton}
            onClick={() => {
              history.push(`/channel/${archive.channelId}/post/${archive.postId}`);
            }}
          >
            <PostGo className="icon" />
            요청글 바로 가기
          </Button>
        )}
      </Box>
    </Box>
  );
};

const wrapper = css`
  padding: 0 calc((100% - 71.25rem) / 2);
  background: #fafafc;
  display: flex;
  justify-content: flex-end;

  & .MuiButton-root {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: bold;
    font-size: 1.125rem;
    height: 3.125rem;
    margin-left: 1.25rem;
  }
`;

const likeButton = (isLiked) => css`
  width: 6.5625rem;
  color: ${isLiked ? palette.orange : palette.black};
  background: ${palette.white};
  border: 2px solid ${isLiked ? palette.orange : palette.black};
  border-radius: 3.125rem;
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.625rem;
  }
`;

const goPostButton = css`
  width: 12.1875rem;
  color: white;
  background: #252424;
  border-radius: 100px;
  &:hover {
    background-color: #252424cc;
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.625rem;
  }
`;

export default ArchiveButtonList;
