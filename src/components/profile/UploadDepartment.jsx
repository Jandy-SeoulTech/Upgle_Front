/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import palette from '../../lib/styles/palette';
import TextField from '../common/TextField';

const UploadDepartment = ({ department, handleChangeFiled }) => {
  const [lengthError, setLengthError] = useState();
  const handleCahngeWellTalent = (e) => {
    if (e.target.value.length > 20) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    handleChangeFiled({
      key: 'department',
      value: e.target.value,
    });
  };

  return (
    <Box css={UploadDepartmentWrapper}>
      <Typography css={title}>현재 소속되어 있는 곳이 있나요?</Typography>

      <Grid container spacing={2}></Grid>

      <TextField
        autoFocus
        label="20자 이내로 작성해주세요"
        value={department}
        onChange={handleCahngeWellTalent}
        css={departmentInput(lengthError)}
        error={lengthError}
      />
    </Box>
  );
};

const UploadDepartmentWrapper = css`
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

const departmentInput = (error) => css`
  width: 21.875rem;
  margin-top: 12.5625rem;
  .MuiInput-underline:after {
    border-bottom-color: ${error && palette.red};
  }
  & label.MuiInputLabel-root {
    color: ${error && palette.red};
  }
`;

export default UploadDepartment;
