/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField as MuiTextField } from '@material-ui/core';

export default function TextField(props) {
  return <MuiTextField variant="standard" {...props} css={defaultStyle} />;
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
