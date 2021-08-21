/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import { ReactComponent as DefaultImage } from '../../lib/assets/defaultImage.svg';
import { ReactComponent as CancelImage } from '../../lib/assets/cancelImage.svg';

const UploadImage = ({ setSkipFlag }) => {
  const [wellTalent, setWellTalent] = useState('');

  const handleCahngeWellTalent = (e) => {
    setWellTalent(e.target.value);
    if (e.target.value !== '') setSkipFlag(true);
    else setSkipFlag(false);
  };

  return (
    <Box css={UploadWellTalentWrapper}>
      <Typography css={title}>
        자신을 드러내는 프로필 사진을 등록해주세요
      </Typography>

      <DefaultImage css={defaultImage} />
      <CancelImage css={cancelImage} />

      <Typography css={description}>
        등록하지 않으면 기본이미지로 설정됩니다.
      </Typography>
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
`;

const defaultImage = css`
  margin-top: 3.375rem;
  margin-left: 5.9375rem;
`;

const cancelImage = css`
  position: relative;
  top: -3rem;
  margin-left: 14.125rem;
`;

const description = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
`;

export default UploadImage;
