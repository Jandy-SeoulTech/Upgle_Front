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
        placeholder="20자 이내로 작성해주세요"
        value={department}
        onChange={handleCahngeWellTalent}
        css={departmentInput}
        error={lengthError}
        helperText={lengthError && '길이 제한을 초과했습니다.'}
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

const departmentInput = css`
  width: 21.875rem;
  margin-top: 12.5625rem;
`;

export default UploadDepartment;
