/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import TextField from '../common/TextField';

const UploadWellTalent = ({ setSkipFlag }) => {
  const [wellTalent, setWellTalent] = useState('');

  const handleCahngeWellTalent = (e) => {
    setWellTalent(e.target.value);
    if (e.target.value !== '') setSkipFlag(true);
    else setSkipFlag(false);
  };

  return (
    <Box css={UploadWellTalentWrapper}>
      <Typography css={title}>
        당신이 <span>잘하는 재능</span>을 알려주세요
      </Typography>

      <Grid container spacing={2}></Grid>

      <TextField
        placeholder="최대 10개까지 입력해주세요"
        value={wellTalent}
        onChange={handleCahngeWellTalent}
        css={talentInput}
      />
    </Box>
  );
};

const UploadWellTalentWrapper = css`
  display: flex;
  flex-direction: column;
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  span {
    color: ${palette.orange};
  }
`;

const talentInput = css`
  width: 21.875rem;
  margin-top: 12.5625rem;
`;

export default UploadWellTalent;
