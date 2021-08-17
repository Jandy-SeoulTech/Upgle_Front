/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Divider, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  isCode,
  isEmail,
  isNickname,
  isPassword,
} from '../../lib/util/validate';
import TextField from '../common/TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';
import ReactLoading from 'react-loading';

const Signup = ({
  onCheckEmail,
  onCheckCode,
  onCheckNickname,
  emailChecked,
  nicknameChecked,
  onEmailChanged,
  onNicknameChanged,
  onSendCode,
  codeSent,
  codeVerified,
  onSignup,
  errorMessage,
  emailSendLoading,
  OAuthComponent,
}) => {
  const m600 = useMediaQuery('(max-width:600px)');
  const m1200 = useMediaQuery('(max-width: 1200px)');

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
    const email = e.target.value;
    setEmail(email);
    if (emailChecked !== null) {
      onEmailChanged();
    }
    if (!email) setEmailError(false);
    else if (isEmail(email)) {
      setEmailError(false);
      onCheckEmail({ email: email });
    } else {
      setEmailError(true);
    }
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    if (!code) setCodeError(false);
    if (isCode(code)) {
      if (code.length <= 6) {
        setCode(code);
        setCodeError(false);
      }
    } else {
      setCodeError(true);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (repassword) {
      setRepasswordError(password !== repassword);
    }
    if (!password) setPasswordError(false);
    else setPasswordError(!isPassword(password));
  };

  const handleRepasswordChange = (e) => {
    const value = e.target.value;
    setRepassword(value);
    setRepasswordError(value !== password);
  };

  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    if (!nickname) {
      setNicknameError(false);
      onNicknameChanged();
    } else if (isNickname(nickname)) {
      setNicknameError(false);
      onCheckNickname({ nickname });
    } else {
      setNicknameError(true);
    }
  };

  const onSendCodeClick = () => {
    onSendCode({ email });
  };

  const onCheckCodeClick = () => {
    onCheckCode({ email, code });
  };

  const handleSubmit = () => {
    onSignup({ email, password, nickname });
  };

  return (
    <Grid container css={wrapper}>
      <Grid item xs={12} lg={6} css={[logoSection, m1200 && smallLogoSection]}>
        <Link to="/">
          <LogoWithTextTemp2 />
        </Link>
      </Grid>

      <Grid
        item
        container
        xs={12}
        lg={6}
        p={5}
        alignItems="center"
        sx={!m1200 && { marginLeft: '50vw' }}
      >
        <Grid item container sx={form}>
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center" sx={title}>
              회원 가입
            </Typography>
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Typography sx={link}>
              <Link to="/signin">이미 계정이 있으신가요? 로그인하기</Link>
            </Typography>
          </Grid>

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="이메일"
              type="email"
              placeholder="example@domain.com"
              autoComplete="new-email"
              error={emailError || emailChecked === false}
              helperText={
                (emailError && '유효하지 않은 이메일 주소입니다.') ||
                (emailChecked === false && '이미 등록된 이메일입니다.') ||
                (codeVerified && '✅ 이메일이 인증되었습니다.')
              }
              value={email}
              onChange={handleEmailChange}
              disabled={codeVerified || codeSent}
              sx={input}
            />
          </Grid>

          {!codeVerified && (
            <Grid item container xs={12} mb={4} justifyContent="center">
              <TextField
                size="small"
                fullWidth
                label="인증번호"
                placeholder="영문, 숫자 조합 6자리"
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
                sx={(input, codeInput)}
              />
              {!codeSent ? (
                emailSendLoading ? (
                  <ReactLoading
                    type="spinningBubbles"
                    color={palette.black}
                    style={{
                      margin: '0 20px',
                      width: '40px',
                      height: '40px',
                    }}
                  />
                ) : (
                  <Button
                    disabled={!email || emailError || !emailChecked || codeSent}
                    onClick={onSendCodeClick}
                    sx={{
                      width: '80px',
                      height: '45px',
                      borderRadius: '50vh',
                      lineHeight: '1rem',
                    }}
                  >
                    인증번호
                    <br />
                    전송
                  </Button>
                )
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
                  sx={{
                    width: '70px',
                    height: '40px',
                    margin: '0 5px',
                    borderRadius: '50vh',
                    fontSize: '14px',
                  }}
                >
                  인증
                </Button>
              )}
            </Grid>
          )}

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
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
              sx={input}
            />
          </Grid>

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="비밀번호 확인"
              type="password"
              autoComplete="new-repassword"
              error={repasswordError}
              helperText={
                repasswordError && '입력한 비밀번호와 일치하지 않습니다.'
              }
              value={repassword}
              onChange={handleRepasswordChange}
              sx={input}
            />
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="닉네임"
              placeholder="4 ~ 8자 제한"
              autoComplete="new-nickname"
              error={nicknameError || nicknameChecked === false}
              helperText={
                (nicknameError && '유효하지 않은 닉네임입니다.') ||
                (nicknameChecked === false && '이미 등록된 닉네임입니다.') ||
                (nicknameChecked === true && '✅ 사용 가능한 닉네임입니다.')
              }
              value={nickname}
              onChange={handleNicknameChange}
              sx={input}
            />
          </Grid>

          <Grid item container xs={12} mb={2} justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={
                !codeVerified ||
                !password ||
                repasswordError ||
                !nicknameChecked
              }
              sx={submitButton}
            >
              가입하기
            </Button>
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <Typography textAlign="center" mt={2} sx={{ color: 'red' }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} md={10}>
            <Divider>
              {m600 ? 'SNS 간편 가입' : 'SNS 계정으로 간편하게 시작하세요!'}
            </Divider>
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <OAuthComponent />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const wrapper = css`
  height: 100vh;
  #naverIdLogin {
    position: absolute;
    z-index: 1;
    a {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    img {
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
  position: fixed;
  height: 100vh;
  width: 50vw;
`;

const smallLogoSection = css`
  justify-content: flex-start;
  align-items: flex-start;
  height: 200px;
  margin-bottom: 118px;
  svg {
    margin: 26px 0 0 32px;
    width: 150px;
  }
  position: static;
`;

const form = css`
  height: fit-content;
  justify-content: center;
  align-items: center;
`;

const title = css`
  font-weight: 700;
  font-size: 34px;
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-bottom: 37px;
`;

const link = css`
  padding: 10px 20px;
  width: fit-content;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-bottom: 45px;
  &:hover {
    border-radius: 20px;
    background-color: #e5e5e5;
  }
`;

const input = css`
  width: 350px;
  height: 32px;
  margin-bottom: 7px;
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
    font-size: 16px;
  }
  .MuiInputLabel-root.Mui-focused {
    color: black;
    font-size: 16px !important;
  }
`;

const codeInput = css`
  width: 270px;
`;

const submitButton = css`
  width: 350px;
  height: 62px;
  background: black;
  font-size: 20px;
  border-radius: 10px;
  margin-top: 36px;
  margin-bottom: 12px;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Signup;
