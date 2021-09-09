/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Paper, Typography } from '@material-ui/core';
import Button from './Button';
import { TextArea } from '../TextField';
import { ReactComponent as Good } from '../../lib/assets/good.svg';
import { ReactComponent as Soso } from '../../lib/assets/soso.svg';
import { ReactComponent as Bad } from '../../lib/assets/bad.svg';
import { useState } from 'react';
import palette from '../../lib/styles/palette';

const ReviewModal = ({ room, handleReview, setOpen }) => {
  const [review, setReview] = useState('');
  const [rate, setRate] = useState();
  return (
    <Paper css={reviewModal}>
      <Typography align="center">
        {room.roomOwner.nickname}님에 대한 리뷰를 남겨주세요
      </Typography>
      <Box css={reviewRate(rate)}>
        <Box
          className="good"
          onClick={() => {
            setRate('good');
          }}
        >
          <Good className="icon" />
          좋아요
        </Box>
        <Box
          className="soso"
          onClick={() => {
            setRate('soso');
          }}
        >
          <Soso className="icon" />
          보통이에요
        </Box>
        <Box
          className="bad"
          onClick={() => {
            setRate('bad');
          }}
        >
          <Bad className="icon" />
          별로에요
        </Box>
      </Box>
      <TextArea
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
        maxLength={100}
        minRows={5}
        css={reviewInput}
      />
      <Box css={buttonWrapper}>
        <Button
          className="cancel"
          onClick={() => {
            setOpen(false);
          }}
        >
          취소
        </Button>
        <Button
          className="exit"
          disabled={!rate || !review}
          onClick={() => {
            handleReview({ review, rate });
          }}
        >
          나가기
        </Button>
      </Box>
    </Paper>
  );
};

const reviewModal = css`
  width: 37.5rem;
  height: 38.5rem;
  background: ${palette.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  & .MuiTypography-root {
    font-family: 'Noto Sans KR';
    font-weight: bold;
    font-size: 1.167rem;
  }
`;

const reviewRate = (rate) => css`
  display: flex;
  justify-content: center;
  margin-top: 5.041rem;
  .MuiBox-root {
    border: 2px solid #e0e0e0;
    border-radius: 50px;
    padding: 0.83rem 1.25rem;
    display: flex;
    align-items: center;
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1.167rem;
    cursor: pointer;
  }
  .MuiBox-root + .MuiBox-root {
    margin-left: 1.25rem;
  }
  .icon {
    width: 2.083rem;
    height: 2.083rem;
    margin-right: 0.833rem;
  }
  .good {
    color: ${rate === 'good' ? '#ff511b' : '#a0a0a0'};
    border: ${rate === 'good' && '2px solid #ff511b;'};
    &:hover {
      color: #ff511b;
      border: 2px solid #ff511b;
    }
  }
  .soso {
    color: ${rate === 'soso' ? '#04bd9e' : '#a0a0a0'};
    border: ${rate === 'soso' && '2px solid #04bd9e;'};
    &:hover {
      color: #04bd9e;
      border: 2px solid #04bd9e;
    }
  }
  .bad {
    color: ${rate === 'bad' ? 'black' : '#a0a0a0'};
    border: ${rate === 'bad' && '2px solid black;'};
    &:hover {
      color: black;
      border: 2px solid black;
    }
  }
`;

const reviewInput = css`
  margin-top: 2.5rem;
  width: 30.5rem;
  height: 14.58rem;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  font-size: 1rem;
  outline: none !important;
  &:focus-visible {
    outline: none !important;
    border: 2px solid black;
  }
`;

const buttonWrapper = css`
  display: flex;
  justify-content: center;
  .MuiButton-root {
    margin-top: 5rem;
    width: 13.3rem;
    height: 4.75rem;
    font-family: 'Noto Sans KR';
    font-weight: bold;
    font-size: 1.66rem;
    border-radius: 10px;
    border: none;
  }
  .MuiButton-root + .MuiButton-root {
    margin-left: 3.75rem;
  }
  .cancel {
    background: black;
    color: white;
  }
  .exit {
    background: #ff511b;
    color: white;
    &:disabled {
      background: #e0e0e0;
      color: #5f5f5f;
    }
  }
`;

export default ReviewModal;
