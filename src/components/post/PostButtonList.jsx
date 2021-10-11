/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as ChatMake } from '../../lib/assets/chatMake.svg';
import { ReactComponent as ChatGo } from '../../lib/assets/chatGo.svg';
import { ReactComponent as ChatIconWhite } from '../../lib/assets/chatGo.svg';
import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import palette from '../../lib/styles/palette';
import CreateRoomModal from './CreateRoomModal';
import { getDateString } from '../../lib/util/dateFormat';

const PostButtonList = ({
  post,
  isLiked,
  onAttentionPost,
  onUnAttentionPost,
  onCreateRoom,
  handleMoveChat,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const SympathyButton = () => (
    <Button
      css={attentionButton(isLiked)}
      onClick={() => {
        isLiked ? onUnAttentionPost(post.id) : onAttentionPost(post.id);
      }}
    >
      {isLiked ? <LikedButton className="icon" /> : <LikeIcon className="icon" />}
      공감
    </Button>
  );

  const ChatControllButton = () => {
    switch (post.status) {
      case 'Open':
        return (
          <Button
            className="goChat"
            onClick={() => {
              handleMoveChat(post.channelRoom && post.channelRoom.id);
            }}
          >
            <ChatGo className="icon" />
            채팅방 바로 가기
          </Button>
        );
      case 'Close':
        return (
          <Button
            className="makeChat"
            onClick={() => {
              setCreateModalOpen(true);
            }}
          >
            <ChatMake className="icon" />
            채팅방 만들기
          </Button>
        );
      case 'Reservation':
        return (
          <Button className="reservation">
            <ChatIconWhite className="icon" />
            {getDateString(post.reservedAt)}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box css={controllButtonWrapper}>
        <Box css={{ marginRight: '1.875rem' }}>
          {post.status !== 'Notice' && <SympathyButton />}
          <ChatControllButton />
        </Box>
      </Box>
      {createModalOpen && (
        <CreateRoomModal
          onCreateRoom={onCreateRoom}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
        />
      )}
    </>
  );
};

export default PostButtonList;

const controllButtonWrapper = css`
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

  .goChat {
    width: 12.1875rem;
    color: ${palette.white};
    background: ${palette.orange};
    border-radius: 100px;
    &:hover {
      filter: brightness(0.95);
    }
  }
  .makeChat {
    width: 11.25rem;
    color: ${palette.white};
    background: ${palette.black};
    border-radius: 100px;
    &:hover {
      filter: brightness(0.95);
    }
  }

  .reservation {
    width: 11.25rem;
    color: ${palette.white};
    background: #5f5f5f;
    border-radius: 100px;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const attentionButton = (isLiked) => css`
  width: 6.5625rem;
  color: ${isLiked ? palette.orange : palette.black};
  background: ${palette.white};
  border: 2px solid ${isLiked ? palette.orange : palette.black};
  border-radius: 50px;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.625rem;
  }
`;
