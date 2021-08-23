/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, TextareaAutosize, Typography } from '@material-ui/core';
import { useState } from 'react';
import palette from '../../lib/styles/palette';

const UploadIntroduce = ({ introduce, handleChangeFiled }) => {
  const [lengthError, setLengthError] = useState();

  const handleCahngeWellTalent = (e) => {
    if (e.target.value.length > 300) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    handleChangeFiled({
      key: 'introduce',
      value: e.target.value,
    });
  };

  return (
    <Box css={UploadIntroduceWrapper}>
      <Typography css={title}>간단하게 자신에 대해 소개해주세요</Typography>

      <TextareaAutosize
        autoFocus
        placeholder="300자 이내로 작성해주세요."
        value={introduce}
        minRows={10}
        maxRows={16}
        onChange={handleCahngeWellTalent}
        css={introduceForm}
      />
      {lengthError && (
        <Typography sx={{ color: 'red', fontSize: '0.75rem' }}>
          길이 제한을 초과했습니다.
        </Typography>
      )}
    </Box>
  );
};

const UploadIntroduceWrapper = css`
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
