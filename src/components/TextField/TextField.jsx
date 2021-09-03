/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField as MuiTextField } from '@material-ui/core';
import { useState } from 'react';
import palette from '../../lib/styles/palette';

export default function TextField({ onChange, maxLength, ...props }) {
  const [lengthError, setLengthError] = useState(false);

  const handleCahngeWellTalent = (e) => {
    if (e.target.value.length > maxLength) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    if (onChange) onChange(e.target.value);
  };

  return (
    <MuiTextField
      variant="standard"
      label={maxLength && `${maxLength}자 이내로 작성해주세요.`}
      onChange={handleCahngeWellTalent}
      error={lengthError}
      {...props}
      css={[defaultStyle, lengthed(lengthError)]}
    />
  );
}

const defaultStyle = css`
  height: 1.75rem;
  & label.Mui-focused {
    color: black;
  }
  & .MuiInput-underline:after {
    border-bottom-color: black;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

const lengthed = (lengthError) => css`
  .MuiInput-underline:after {
    border-bottom-color: ${lengthError && palette.red};
  }
  & label.MuiInputLabel-root {
    color: ${lengthError && palette.red};
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${lengthError ? 'red' : 'black'};
    }
    &:hover fieldset {
      border-color: ${lengthError ? 'red' : 'black'};
    }
    &.Mui-focused fieldset {
      border-color: ${lengthError ? 'red' : 'black'};
    }
  }
`;
