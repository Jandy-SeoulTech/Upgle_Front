/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';

const UploadIntroduce = ({ setSkipFlag }) => {
  const [wellTalent, setWellTalent] = useState('');

  const handleCahngeWellTalent = (e) => {
    setWellTalent(e.target.value);
    if (e.target.value !== '') setSkipFlag(true);
    else setSkipFlag(false);
  };

  return (
    <Box css={UploadWellTalentWrapper}>
      <Typography css={title}>간단하게 자신에 대해 소개해주세요</Typography>

      <TextareaAutosize
        placeholder="300자 이내로 작성해주세요."
        value={wellTalent}
        minRows={10}
        maxRows={16}
        onChange={handleCahngeWellTalent}
        css={introduceForm}
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

const introduceForm = css`
  width: 21.875rem;
  margin-top: 4.6875rem;
  background: #f0f0f0;
  font-size: 0.875rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  padding: 0.9375rem 0.75rem;
  resize: none;
  &:focus-visible {
    outline: 2px solid black !important;
  }
`;

export default UploadIntroduce;
