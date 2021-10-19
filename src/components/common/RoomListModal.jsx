/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { ReactComponent as Time } from '../../lib/assets/time.svg';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import { getChatDate } from '../../lib/util/dateFormat';
import ClearIcon from '@material-ui/icons/Clear';
import Button from './Button';

const RoomCard = ({ room, checked, onSelect }) => {
  return (
    <Box
      css={CharCardWrapper(checked)}
      onClick={() => {
        onSelect(room);
      }}
    >
      <Box css={topContent}>
        <Typography css={title}>{room.name}</Typography>
        <Typography css={description}>
          <Time className="icon" />
          {getChatDate(room.createdAt)}
        </Typography>
      </Box>
      <Box css={bottomContent}>
        <Avatar css={bottomIcon} src={room.channel.channelImage}></Avatar>
        <Typography css={bottomTitle}>{room.channel.name}</Typography>
      </Box>
    </Box>
  );
};

const RoomListModal = ({ ownRoomList, setOpen, onBefore, onSuccess }) => {
  const [selectRoom, setSelectRoom] = useState(null);

  return (
    <Box css={RoomListModalWrapper}>
      <Box
        css={{
          padding: '1.1875rem 1.875rem',
          fontSize: '1.125rem',
          fontFamily: 'Noto Sans KR',
          fontWeight: '700',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        채팅방 목록
        <ClearIcon
          css={{ cursor: 'pointer' }}
          onClick={() => {
            setOpen(false);
          }}
        />
      </Box>
      <Box css={{ padding: '1.875rem', height: '500px', overflow: 'auto' }}>
        <Grid container spacing={5}>
          {ownRoomList.map((room) => (
            <Grid item>
              <RoomCard
                room={room}
                checked={room.id === selectRoom?.id}
                onSelect={(room) => {
                  setSelectRoom(room);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        css={{
          padding: '1.25rem 1.875rem',
          fontSize: '1.125rem',
          fontFamily: 'Noto Sans KR',
          fontWeight: '700',
          boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.25)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {onBefore ? <Button onClick={onBefore}>뒤로</Button> : <div></div>}
        <Button
          disabled={!selectRoom}
          onClick={(e) => {
            e.stopPropagation();
            onSuccess(selectRoom);
            setOpen(false);
          }}
        >
          계속
        </Button>
      </Box>
    </Box>
  );
};

export default RoomListModal;

const RoomListModalWrapper = css`
  width: 50rem;
  height: 40rem;
  background-color: white;
  z-index: 999;
  border-radius: 10px;
`;

const CharCardWrapper = (checked) => css`
  width: 13.75rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
  border: ${checked && '2px solid #FF511B'};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  }
`;

const topContent = css`
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.75rem;
  font-weight: 600;
`;

const description = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 500;
  color: #7b7b7b;
  display: flex;
  align-items: center;
  margin-top: 1.0625rem;
  .icon {
    margin-right: 0.1625rem;
  }
`;

const bottomContent = css`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  padding: 0.9375rem;
  border-radius: 0 0 5px 5px;
`;

const bottomIcon = css`
  width: 1.875rem;
  height: 1.875rem;
`;

const bottomTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 400;
  margin-left: 0.5rem;
`;
