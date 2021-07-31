import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styleValue = {
  xsInput: 9,
  mdInput: 10,
  inputLabel: 3,
  inputField: 9,
};

const Signup = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          // TODO: xs일 때, height 수정 필요
          height: '100vh',
          background: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Grid>

      <Grid item container xs={12} md={6} p={5} alignItems="center" rowGap={0}>
        <Grid item container xs={12} justifyContent="center">
          <Typography variant="h1" fontSize="2rem" mb={4}>
            회원가입
          </Typography>
        </Grid>

        <Grid item container justifyContent="center" rowGap={{ xs: 1, md: 2 }}>
          <Grid item container xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Grid item container xs={styleValue.inputLabel} alignItems="center">
              <Typography>닉네임</Typography>
            </Grid>
            <Grid item xs={styleValue.inputField}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item container xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Grid item container xs={styleValue.inputLabel} alignItems="center">
              <Typography>이메일</Typography>
            </Grid>
            <Grid item xs={styleValue.inputField}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item container xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Grid
              item
              container
              xs={styleValue.inputLabel}
              alignItems="center"
            ></Grid>
            <Grid item container xs={7} alignItems="center">
              <TextField
                size="small"
                disabled
                sx={{ bgcolor: 'whitesmoke', maxWidth: '180px' }}
              ></TextField>
            </Grid>
            <Grid
              item
              container
              xs={2}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: '50px',
                  fontSize: '.8rem',
                  height: 'fit-content',
                }}
              >
                인증
              </Button>
            </Grid>
          </Grid>

          <Grid item container xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Grid item container xs={styleValue.inputLabel} alignItems="center">
              <Typography>비밀번호</Typography>
            </Grid>
            <Grid item xs={styleValue.inputField}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item container xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Grid item container xs={styleValue.inputLabel} alignItems="center">
              <Typography>비밀번호 확인</Typography>
            </Grid>
            <Grid item xs={styleValue.inputField}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item xs={styleValue.xsInput} md={styleValue.mdInput} mt={2}>
            <Button variant="contained" fullWidth>
              가입
            </Button>
          </Grid>
          <Grid item xs={styleValue.xsInput} md={styleValue.mdInput}>
            <Typography textAlign="center" mt={1} sx={{ color: '#414CD9' }}>
              <Link to="/signin">이미 계정이 있으신가요?</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
