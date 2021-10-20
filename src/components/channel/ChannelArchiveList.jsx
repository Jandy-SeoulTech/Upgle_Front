/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Avatar, Pagination } from '@material-ui/core';
import Button from '../common/Button';
import { ReactComponent as PostWrite } from '../../lib/assets/postWrite.svg';
import { getDateString } from '../../lib/util/dateFormat';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Modal from '../common/Modal';
import ClearIcon from '@material-ui/icons/Clear';
import RoomListModalContainer from '../../containers/common/RoomListModalContainer';
import AnswerListModalContainer from '../../containers/common/AnswerListModalContainer';

const Item = ({ channel, archive }) => {
  const history = useHistory();

  return (
    <Box
      css={item}
      onClick={() => {
        history.push(`/channel/${channel.id}/archive/${archive.id}`);
      }}
    >
      <Box css={itemLeft}>
        <Box css={title}>
          <Box css={{ display: 'flex' }}>
            <Typography className="title">{archive.title}</Typography>
          </Box>
          <Typography className="date">{getDateString(archive.createdAt)}</Typography>
        </Box>
        <Typography css={content}>{archive.content}</Typography>
        <Box css={{ display: 'flex', alignItems: 'center', marginTop: '1.375rem' }}>
          {archive.authorId === channel.adminId ? (
            <>
              <div css={adminIcon}>
                <p>관리자</p>
              </div>
              <Avatar
                src={archive.owner.profile.profileImage}
                css={{
                  width: '2.8125rem',
                  height: '2.8125rem',
                  border: '2px solid #04BD9E',
                }}
              />
            </>
          ) : (
            <Avatar
              src={archive.owner.profile.profileImage}
              css={{ width: '2.8125rem', height: '2.8125rem' }}
            />
          )}
          <Typography css={nickname}>{archive.owner.nickname}</Typography>
        </Box>
      </Box>
      {archive.images.length !== 0 && (
        <Box css={itemRight}>
          <img src={archive.images[0].src} alt={archive.images[0].src} />
        </Box>
      )}
    </Box>
  );
};

const ChannelArchiveList = ({
  channel,
  archives,
  onQueryChange,
  page,
  lastPage,
  onCreateRoomArchive,
}) => {
  const history = useHistory();
  const [writeModal, setWriteModal] = useState(false);
  const [ownRoomListModal, setOwnRoomListModal] = useState(false);
  const [selectRoom, setSelectRoom] = useState(null);

  return (
    <Box css={backgroudWrapper}>
      <Modal open={writeModal} setOpen={setWriteModal}>
        <Box css={modal}>
          <Box css={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <ClearIcon
              css={{ cursor: 'pointer' }}
              onClick={() => {
                setWriteModal(false);
              }}
            />
          </Box>
          <Box css={{ fontFamily: 'Noto Sans KR', fontSize: '1.25rem', fontWeight: '700' }}>
            채팅방 내용을 기록하시겠습니까?
          </Box>
          <Box css={buttonWrapper}>
            <Button
              className="yes"
              onClick={() => {
                setWriteModal(false);
                setOwnRoomListModal(true);
              }}
            >
              네
            </Button>
            <Button
              className="no"
              onClick={() => {
                history.push(`/channel/${channel.id}/editArchive`);
              }}
            >
              아니오
            </Button>
          </Box>
        </Box>
      </Modal>
      <RoomListModalContainer
        open={ownRoomListModal}
        setOpen={setOwnRoomListModal}
        onBefore={() => {
          setOwnRoomListModal(false);
          setWriteModal(true);
        }}
        onSuccess={(room) => {
          setSelectRoom(room);
        }}
      />
      <AnswerListModalContainer
        roomId={selectRoom?.id}
        open={selectRoom}
        setOpen={setSelectRoom}
        onBefore={() => {
          setSelectRoom(false);
          setOwnRoomListModal(true);
        }}
        onSuccess={(selectedAnswer) => {
          onCreateRoomArchive({ room: selectRoom, content: selectedAnswer.join('\n') });
        }}
      />
      <Box css={writeTitleWrapper}>
        <Button
          css={write}
          onClick={() => {
            setWriteModal(true);
          }}
        >
          <PostWrite className="icon" css={{ marginRight: '.625rem' }} />
          글쓰기
        </Button>
        <Typography css={writeTitle}>
          채널과 관련하여 공유하고 싶은 내용을 작성해주세요. 자신이 오픈한 채팅 목록을 불러와
          아카이빙 할 수도 있습니다.
        </Typography>
      </Box>
      {archives?.length > 0 ? (
        <>
          <Box css={archivesWrapper}>
            {archives.map((archive) => (
              <Item key={archive.id} channel={channel} archive={archive} />
            ))}
          </Box>
          <Pagination
            css={pagination}
            count={lastPage}
            page={page}
            showFirstButton
            showLastButton
            onChange={(e, page) => {
              onQueryChange('page', parseInt(page, 10));
            }}
          />
        </>
      ) : (
        <Typography css={noContents}>아직 등록된 아카이브가 없습니다.</Typography>
      )}
    </Box>
  );
};

const backgroudWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
`;

const modal = css`
  padding: 1.125rem;
  width: 37.5rem;
  height: 21.875rem;
  z-index: 999;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 4rem;

  .MuiButton-root {
    width: 12.5rem;
    height: 3.5625rem;
    border-radius: 10px;
    font-size: 1.25rem;
    color: white;
  }

  .yes {
    background-color: #ff511b;
    border: none;
  }

  .no {
    background-color: black;
    border: none;
  }
`;

const writeTitleWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 6.25rem 0;
`;

const write = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: bold;
  font-size: 1.25rem;
  color: #ffffff;
  background: #000000;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 9.955rem;
  height: 3.4375rem;
  margin: auto;
`;

const writeTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  margin: 1.875rem auto auto auto;
`;

const archivesWrapper = css`
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin-bottom: 6.25rem;
`;

const item = css`
  height: 14.875rem;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  :hover {
    background-color: #f0f0f0;
  }
`;

const itemLeft = css`
  flex: 1;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.875rem 1.25rem;
`;

const itemRight = css`
  padding: 1.875rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 11.25rem;
    height: 11.25rem;
    object-fit: cover;
  }
`;

const title = css`
  width: 100%;
  height: 1.5625rem;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  & .MuiTypography-root {
    padding-left: 0.9375rem;
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
  }
  .title {
    padding: 0;
    font-weight: 600;
    font-size: 1.25rem;
  }
  .date {
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #5f5f5f;
  }
`;

const content = css`
  height: 2.8125rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 0.875rem;
  color: #5f5f5f;
`;

const adminIcon = css`
  width: 2.375rem;
  height: 1.125rem;
  background: #04bd9e;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 0.625rem;
    color: #ffffff;
  }
`;

const nickname = css`
  margin-left: 0.75rem;
  font-family: 'Noto Sans KR';
  font-size: 0.8125rem;
  color: #000000;
`;

const noContents = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 1rem;
  color: #5f5f5f;
  text-align: center;
  height: 10rem;
  line-height: 10rem;
`;

const pagination = css`
  display: flex;
  justify-content: center;
  padding-bottom: 12.5rem;
`;

export default ChannelArchiveList;
