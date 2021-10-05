/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Checkbox, Paper, Typography } from '@material-ui/core';
import Modal from '../common/Modal';
import { TextField as MuiTextField } from '@material-ui/core';
import { TextField } from '../TextField';
import Clear from '@material-ui/icons/Clear';
import { useState } from 'react';
import Button from '../common/Button';

const CreateRoomModal = ({ onCreateRoom, createModalOpen, setCreateModalOpen }) => {
  const [roomName, setRoomName] = useState('');
  const [isReserve, setIsReserve] = useState(false);
  const [reserveDate, setReserveDate] = useState();

  const handleCreateRoom = () => {
    onCreateRoom({
      status: isReserve ? 'Reservation' : 'Open',
      name: roomName,
      reservedTime: isReserve ? reserveDate : null,
    });
  };

  return (
    <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
      <Paper css={createRoomModal}>
        <Box css={modalTitle}>
          <Typography>채팅방 만들기</Typography>
          <Clear
            onClick={() => {
              setCreateModalOpen(false);
            }}
          />
        </Box>
        <Box css={modalContent}>
          <Box css={modalForm}>
            <Typography>채팅방 이름</Typography>
            <TextField
              size="small"
              variant="outlined"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              maxLength={20}
              fullWidth
            />
          </Box>
          <Box css={modalForm}>
            <Typography>예약 하기</Typography>
            <Checkbox
              checked={isReserve}
              onChange={(e) => {
                setIsReserve(e.target.checked);
              }}
            />
          </Box>
          <Box css={modalForm}>
            <Typography>예약 시간</Typography>
            <MuiTextField
              type="datetime-local"
              sx={{ width: 300 }}
              value={reserveDate}
              disabled={!isReserve}
              onChange={(e) => {
                setReserveDate(e.target.value);
                console.log(reserveDate);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box css={modalButtonGroup}>
            <Button css={modalButton} disabled={!roomName || isReserve} onClick={handleCreateRoom}>
              바로 열기
            </Button>
            <Button
              css={modalButton}
              disabled={!roomName || !isReserve || !reserveDate}
              onClick={handleCreateRoom}
            >
              예약 하기
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreateRoomModal;

const createRoomModal = css`
  width: 50rem;
  height: 28.125rem;
  background-color: white;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const modalTitle = css`
  height: 3.75rem;
  padding: 0 1.34375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  .MuiTypography-root {
    height: 100%;
    line-height: 3.75rem;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1rem;
  }
`;

const modalContent = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 7.5rem;
`;

const modalForm = css`
  display: flex;
  height: 2.25rem;
  align-items: center;
  .MuiTypography-root {
    width: 6.875rem;
    height: 100%;
    flex-shrink: 0;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
  .MuiButtonBase-root {
    margin: 0;
    width: 1.25rem;
    height: 1.25rem;
  }
  .MuiFormControl-root {
    height: 2.25rem;
  }
  & + & {
    margin-top: 2.1875rem;
  }
`;

const modalButtonGroup = css`
  width: 100%;
  margin-top: 4.375rem;
  display: flex;
  justify-content: space-between;
`;

const modalButton = css`
  width: 15.625rem;
  height: 3.5625rem;
  background: black;
  color: white;
  :disabled {
    background: #e0e0e0;
    color: #5f5f5f;
  }
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 10px;
`;
