import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from '../../lib/util/validate';

const Signin = ({ onLogin, errorMessage, onKakaoOauth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === '') setEmailError(false);
    else setEmailError(!isEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email) alert('이메일을 입력해주세요');
    if (!password) alert('비밀번호를 입력해주세요');
    if (emailError) return;
    onLogin({ email, password });
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Grid>
      <Grid item container md={6} xs={12} p={5} alignItems="center">
        <Grid
          item
          container
          sx={{ height: 'fit-content' }}
          justifyContent="center"
        >
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center">
              로그인
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography textAlign="center" mb={2}>
              <Link to="/signup">Upgle이 처음이신가요? 간편 가입하기</Link>
            </Typography>
          </Grid>

          <Grid item xs={8} mb={4}>
            <TextField
              size="small"
              fullWidth
              label="Email"
              error={emailError}
              helperText={emailError && '잘못된 이메일 형식입니다.'}
              value={email}
              onChange={handleEmailChange}
              type="email"
            ></TextField>
          </Grid>

          <Grid item xs={8} mb={4}>
            <TextField
              size="small"
              fullWidth
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Signin
            </Button>
          </Grid>
          <Grid item container xs={8} mt={2}>
            <Grid item container xs={4} justifyContent="center">
              <Avatar onClick={onKakaoOauth}></Avatar>
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Avatar></Avatar>
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Avatar></Avatar>
            </Grid>
          </Grid>
          {errorMessage && (
            <Grid item xs={8}>
              <Typography textAlign="center" mt={2} sx={{ color: 'red' }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
