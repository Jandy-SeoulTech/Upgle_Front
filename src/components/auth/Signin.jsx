/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import KakaoLogin from 'react-kakao-login';
import { Link } from 'react-router-dom';
import { isEmail } from '../../lib/util/validate';
import GoogleLogin from 'react-google-login';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';
import TextField from '../common/TextField';
import Button from '../common/Button';
import { ReactComponent as KakaoIcon } from '../../lib/assets/kakaoIcon.svg';
import { ReactComponent as GoogleIcon } from '../../lib/assets/googleIcon.svg';
import { ReactComponent as NaverIcon } from '../../lib/assets/naverIcon.svg';
import palette from '../../lib/styles/palette';

const Signin = ({ onLogin, errorMessage, onKakaoOauth, onGoogleOauth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const m1200 = useMediaQuery('(max-width: 1199px)');

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
    <Grid container css={signinWrapper}>
      <Grid item xs={12} lg={6} css={[logoSection, m1200 && smallLogoSection]}>
        <Link to="/">
          <LogoWithTextTemp2 />
        </Link>
      </Grid>
      <Grid item container lg={6} xs={12} p={5} alignItems="center">
        <Grid item container sx={sgininForm}>
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center" sx={signinTitle}>
              로그인
            </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Typography sx={signupLink}>
              <Link to="/signup">Upgle이 처음이신가요? 간편 가입하기</Link>
            </Typography>
          </Grid>

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="이메일"
              error={emailError}
              helperText={emailError && '잘못된 이메일 형식입니다.'}
              value={email}
              onChange={handleEmailChange}
              type="email"
              sx={input}
            ></TextField>
          </Grid>

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              sx={input}
            ></TextField>
          </Grid>
          <Grid item container xs={12} mb={2} justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={signinButton}
            >
              로그인
            </Button>
          </Grid>
          {errorMessage && (
            <Grid item xs={12}>
              <Typography textAlign="center" mt={2} sx={{ color: 'red' }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}
          <Grid item container xs={12} justifyContent="center">
            <Box sx={findForm}>
              <Grid item xs={5}>
                <Link to="">비밀번호 찾기</Link>
              </Grid>
              <Grid item xs={5}>
                <Link to="">이메일 찾기</Link>
              </Grid>
            </Box>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Box sx={oAuthForm}>
              <Grid item container xs={4} justifyContent="center">
                <KakaoLogin
                  useLoginForm={true}
                  token={process.env.REACT_APP_KAKAO_SECRET}
                  onSuccess={(result) => {
                    console.log(result);
                    onKakaoOauth(result.response.access_token);
                  }}
                  onFail={(result) => console.log(result)}
                  render={(props) => (
                    <KakaoIcon {...props} css={oAuthIcon}></KakaoIcon>
                  )}
                ></KakaoLogin>
              </Grid>
              <Grid item container xs={4} justifyContent="center">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(props) => (
                    <GoogleIcon {...props} css={oAuthIcon}></GoogleIcon>
                  )}
                  onSuccess={(result) => onGoogleOauth(result.accessToken)}
                  onFailure={(result) => console.log(result)}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
              <Grid item container xs={4} justifyContent="center">
                <div id="naverIdLogin"></div>
                <NaverIcon css={oAuthIcon}></NaverIcon>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const signinWrapper = css`
  height: 100vh;
  #naverIdLogin {
    position: absolute;
    z-index: 1;
    &:hover::before {
      content: '';
      display: block;
      position: absolute;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      opacity: 0;
    }
  }
`;

const logoSection = css`
  background: url('/image/authBackground.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const smallLogoSection = css`
  width: 100vw;
  justify-content: flex-start;
  align-items: flex-start;
  height: 12.5rem;
  margin-bottom: 6rem;
  svg {
    margin: 1.625rem 0 0 2rem;
    width: 9.375rem;
  }
`;

const sgininForm = css`
  height: fit-content;
  justify-content: center;
  align-items: center;
`;

const signinTitle = css`
  font-weight: 700;
  font-size: 2.125rem;
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-bottom: 2.3125rem;
`;

const signupLink = css`
  padding: 0.625rem 1.25rem;
  width: fit-content;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-bottom: 2.8125rem;
  &:hover {
    border-radius: 1.25rem;
    background-color: #e5e5e5;
  }
`;

const input = css`
  width: 21.875rem;
  height: 2rem;
  margin-bottom: 0.4375rem;
  .MuiInput-root {
    &::before {
      border-bottom: 1px solid ${palette.black} !important;
    }
    &::after {
      border-bottom: 2px solid ${palette.black} !important;
    }
  }
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 1rem;
  }
  .MuiInputLabel-root.Mui-focused {
    color: black;
    font-size: 1rem !important;
  }
`;

const signinButton = css`
  width: 21.875rem;
  height: 3.875rem;
  background: black;
  font-size: 1.25rem;
  border-radius: 0.625rem;
  margin-top: 1.5rem;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const findForm = css`
  width: 21.875rem;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 0.875rem;
  color: #7b7b7b;
`;

const oAuthForm = css`
  display: flex;
  justify-content: center;
  margin-top: 3.25rem;
  width: 21.875rem;
`;

const oAuthIcon = css`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
  }
`;

export default Signin;
