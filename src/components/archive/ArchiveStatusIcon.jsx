/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';

const ArchiveStatusIcon = () => {
  return (
    <Box css={[defaultStyle, { backgroundColor: 'black' }]}>
      <Typography>요청 해결</Typography>
    </Box>
  );
};

export default ArchiveStatusIcon;

const defaultStyle = css`
  width: 5rem;
  height: 2.125rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiTypography-root {
    padding: 0;
    text-align: center;
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: bold;
    font-size: 0.9375rem;
    color: #ffffff;
  }
`;
