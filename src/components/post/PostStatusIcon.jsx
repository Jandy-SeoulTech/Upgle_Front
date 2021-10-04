/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';

const PostStatusIcon = ({ status }) => {
  switch (status) {
    case 'Notice':
      return (
        <Box css={[defaultStyle, { backgroundColor: '#FF1F00' }]}>
          <Typography>공지</Typography>
        </Box>
      );
    case 'Open':
      return (
        <Box css={[defaultStyle, { backgroundColor: '#FF511B' }]}>
          <Typography>채팅 오픈</Typography>
        </Box>
      );
    case 'Reservation':
      return (
        <Box css={[defaultStyle, { backgroundColor: '#5F5F5F' }]}>
          <Typography>채팅 예약</Typography>
        </Box>
      );
    default:
      return null;
  }
};

export default PostStatusIcon;

const defaultStyle = css`
  width: 80px;
  height: 34px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: bold;
    font-size: 15px;
    color: #ffffff;
  }
`;
