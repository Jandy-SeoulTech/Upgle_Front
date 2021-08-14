import React, { useState } from 'react';
import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  isCode,
  isEmail,
  isNickname,
  isPassword,
} from '../../lib/util/validate';
import TextField from '../common/TextField';
import Button from '../common/Button';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { ReactComponent as Logo } from '../../lib/assets/logoWithTextTemp.svg';

const Signup = ({
  onCheckEmail,
  onSendCode,
  onCheckCode,
  onCheckNickname,
  emailChecked,
  codeSent,
  codeVerified,
  nicknameChecked,
  onEmailChanged,
  onNicknameChanged,
  onSignup,
  onKakaoOauth,
  onGoogleOauth,
  errorMessage,
}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRepasswordError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);

  const handleEmailChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
    if (emailChecked !== null) {
      onEmailChanged();
    }
    if (!value) setEmailError(false);
    else if (!isEmail(value)) setEmailError(true);
    else {
      setEmailError(false);
      onCheckEmail({ email: value });
    }
  };

  const onSendCodeClick = () => {
    onSendCode({ email });
  };

  const handleCodeChange = (e) => {
    const {
      target: { value },
    } = e;
    if (isCode(value)) {
      if (value.length <= 6) {
        setCode(value);
        setCodeError(false);
      }
    } else {
      setCodeError(true);
    }
    if (!value) setCodeError(false);
  };

  const onCheckCodeClick = () => {
    onCheckCode({ email, code });
  };

  const handlePasswordChange = (e) => {
    const {
      target: { value },
    } = e;
    setPassword(value);
    if (repassword) {
      setRepasswordError(value !== repassword);
    }
    if (!value) setPasswordError(false);
    else setPasswordError(!isPassword(value));
  };

  const handleRepasswordChange = (e) => {
    const {
      target: { value },
    } = e;
    setRepassword(value);
    setRepasswordError(value !== password);
  };

  const handleNicknameChange = (e) => {
    const {
      target: { value },
    } = e;
    setNickname(value);
    if (!value) {
      onNicknameChanged();
    }
    if (!value) setNicknameError(false);
    else if (!isNickname(value)) setNicknameError(true);
    else {
      setNicknameError(false);
      onCheckNickname({ nickname: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup({ email, password, nickname });
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
        container
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Logo />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        p={5}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Typography variant="h4" textAlign="center">
            회원 가입
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography textAlign="center" mb={4}>
            <Link to="/signin">이미 계정이 있으신가요? 로그인하기</Link>
          </Typography>
        </Grid>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          xs={10}
          rowGap={4}
          justifyContent="center"
        >
          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="email"
              label="이메일"
              placeholder="example@domain.com"
              name="email"
              autoComplete="new-email"
              error={emailError || emailChecked === false}
              helperText={
                (emailError && '유효하지 않은 이메일 주소입니다.') ||
                (emailChecked === false && '이미 등록된 이메일입니다.')
              }
              value={email}
              onChange={handleEmailChange}
              disabled={codeVerified || codeSent}
            />
          </Grid>
          {!codeVerified ? (
            <Grid item container xs={12} md={8}>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="인증번호"
                  placeholder="영문, 숫자 조합 6자리"
                  name="code"
                  autoComplete="code"
                  error={codeError || codeVerified === false}
                  helperText={
                    codeError
                      ? '영문, 숫자만 입력할 수 있습니다.'
                      : emailChecked &&
                        codeVerified === false &&
                        '인증번호를 다시 확인해주세요.'
                  }
                  value={code}
                  onChange={handleCodeChange}
                  disabled={!codeSent}
                />
              </Grid>
              <Grid
                item
                container
                xs={4}
                justifyContent="center"
                alignItems="center"
              >
                {!codeSent ? (
                  <Button
                    disabled={!email || emailError || !emailChecked || codeSent}
                    onClick={onSendCodeClick}
                    sx={{
                      borderRadius: '50vh',
                      lineHeight: '1rem',
                      height: 'fit-content',
                    }}
                  >
                    인증번호
                    <br />
                    전송
                  </Button>
                ) : (
                  <Button
                    disabled={
                      !email ||
                      emailError ||
                      !codeSent ||
                      codeError ||
                      code.length !== 6
                    }
                    onClick={onCheckCodeClick}
                  >
                    인증
                  </Button>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid item container xs={12} md={8}>
              <Typography pl={1}>✅ 이메일이 인증되었습니다.</Typography>
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="비밀번호"
              placeholder="8 ~ 10자 영문, 숫자 조합"
              type="password"
              autoComplete="new-password"
              error={passwordError}
              helperText={
                passwordError && '영문, 숫자 포함 8자리 이상 입력해주세요.'
              }
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="repassword"
              name="repassword"
              label="비밀번호 확인"
              type="password"
              autoComplete="new-repassword"
              error={repasswordError}
              helperText={
                repasswordError && '입력한 비밀번호와 일치하지 않습니다.'
              }
              value={repassword}
              onChange={handleRepasswordChange}
            />
          </Grid>
          <Grid item container xs={12} md={8}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nickname"
                label="닉네임"
                placeholder="4 ~ 8자 제한"
                name="nickname"
                autoComplete="new-nickname"
                error={nicknameError || nicknameChecked === false}
                helperText={
                  (nicknameError && '유효하지 않은 닉네임입니다.') ||
                  (nicknameChecked === false && '이미 등록된 닉네임입니다.') ||
                  (nicknameChecked === true && '사용 가능한 닉네임입니다.')
                }
                value={nickname}
                onChange={handleNicknameChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                !codeVerified ||
                !password ||
                repasswordError ||
                !nicknameChecked
              }
            >
              가입하기
            </Button>
          </Grid>
          <Grid item xs={12} md={10}>
            <Divider>SNS 계정으로 간편하게 시작하세요!</Divider>
          </Grid>
          <Grid item container xs={8}>
            <Grid item container xs={4} justifyContent="center">
              <KakaoLogin
                useLoginForm={true}
                token={process.env.REACT_APP_KAKAO_SECRET}
                onSuccess={(result) => {
                  console.log(result);
                  onKakaoOauth(result.response.access_token);
                }}
                onFail={(result) => console.log(result)}
                render={(props) => <Avatar {...props}></Avatar>}
              ></KakaoLogin>
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(props) => <Avatar {...props}></Avatar>}
                onSuccess={(result) => onGoogleOauth(result.accessToken)}
                onFailure={(result) => console.log(result)}
                cookiePolicy={'single_host_origin'}
              />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Avatar id="naverIdLogin"></Avatar>
            </Grid>
          </Grid>
        </Grid>

        {errorMessage && (
          <Grid item xs={12}>
            <Typography textAlign="center" mt={2} sx={{ color: 'red' }}>
              {errorMessage}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Signup;
