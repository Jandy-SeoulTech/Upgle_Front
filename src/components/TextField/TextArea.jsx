/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const TextArea = ({ onChange, maxLength, ...props }) => {
  const [lengthError, setLengthError] = useState();

  const handleCahnge = (e) => {
    if (e.target.value.length > maxLength) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    if (onChange) onChange(e);
  };

  return (
    <>
      <TextareaAutosize
        placeholder={maxLength && `${maxLength}자 이내로 작성해주세요.`}
        onChange={maxLength ? handleCahnge : onChange}
        {...props}
        css={[defaultStyle(lengthError)]}
      />
      {lengthError && (
        <Typography sx={{ color: 'red', fontSize: '0.75rem' }}>
          길이 제한을 초과했습니다.({maxLength}자 이내)
        </Typography>
      )}
    </>
  );
};

const defaultStyle = (lengthError) => css`
  font-size: 0.875rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  padding: 0.9375rem 0.75rem;
  resize: none;
  outline: ${lengthError && '1px solid red'};
  &:focus-visible {
    outline: ${lengthError
      ? '2px solid red !important;'
      : '2px solid black !important;'};
  }
`;

export default TextArea;
