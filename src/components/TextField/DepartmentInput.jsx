/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import TextField from './TextField';

const DepartmentInput = ({ input, onChange, ...props }) => {
  const [lengthError, setLengthError] = useState(false);

  const handleCahngeWellTalent = (e) => {
    if (e.target.value.length > 20) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    onChange(e.target.value);
  };

  return (
    <TextField
      {...props}
      label="20자 이내로 작성해주세요"
      value={input}
      onChange={handleCahngeWellTalent}
      error={lengthError}
      css={defaultStyle(lengthError)}
    />
  );
};

const defaultStyle = (lengthError) => css`
  .MuiInput-underline:after {
    border-bottom-color: ${lengthError && palette.red};
  }
  & label.MuiInputLabel-root {
    color: ${lengthError && palette.red};
  }
`;

export default DepartmentInput;
