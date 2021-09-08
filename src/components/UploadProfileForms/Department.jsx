/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import { TextField } from '../TextField';

const Department = ({ department, handleChangeFiled }) => {
  return (
    <>
      <Typography css={title}>현재 소속되어 있는 곳이 있나요?</Typography>
      <TextField
        autoFocus
        input={department}
        maxLength={20}
        onChange={(e) => {
          handleChangeFiled({
            key: 'department',
            value: e.target.value,
          });
        }}
        css={departmentInput}
      />
    </>
  );
};

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  span {
    color: ${palette.orange};
  }
`;

const departmentInput = css`
  width: 21.875rem;
  margin-top: 12.5625rem;
`;

export default Department;
