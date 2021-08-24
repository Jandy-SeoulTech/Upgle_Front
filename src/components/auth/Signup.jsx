/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
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
  const m1200 = useMediaQuery('(max-width: 1199px)');

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
      setCodeError('영문, 숫자만 입력할 수 있습니다.');
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
    if (!email || emailError || !emailChecked || codeSent) {
      setEmailError('유효한 이메일을 입력해주세요.');
    } else {
      setEmailError(false);
      onSendCode({ email });
    }
  };

  const onCheckCodeClick = () => {
    if (!email || emailError || !codeSent || codeError || code.length !== 6) {
      setCodeError('유효한 인증번호를 입력해주세요.');
    } else {
      setCodeError(false);
      onCheckCode({ email, code });
    }
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

      <Grid item container xs={12} lg={6} sx={form}>
        <Grid item container justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center" sx={title}>
              간편 회원 가입
            </Typography>
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Typography sx={link}>
              <Link to="/signin">이미 가입된 회원이신가요? 로그인하기</Link>
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
                    ? codeError
                    : emailChecked &&
                      codeVerified === false &&
                      '인증번호를 다시 확인해주세요.'
                }
                value={code}
                onChange={handleCodeChange}
                disabled={!codeSent}
                css={(input, codeInput)}
              />
              {!codeSent ? (
                emailSendLoading ? (
                  <ReactLoading
                    type="spinningBubbles"
                    color={palette.black}
                    style={{
                      marginLeft: m600 ? '15px' : '30px',
                      marginRight: m600 ? '35px' : '50px',
                      width: '40px',
                      height: '40px',
                    }}
                  />
                ) : (
                  <Button onClick={onSendCodeClick} css={sendCodeButton}>
                    인증번호 전송
                  </Button>
                )
              ) : (
                <Button onClick={onCheckCodeClick} css={checkCodeButton}>
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
              placeholder="10자 이내"
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

          <Grid item xs={12} md={10} mt="80px" textAlign="center">
            <Typography>
              {m600 ? 'SNS 간편 가입' : 'SNS 계정으로 간편하게 시작해보세요'}
            </Typography>
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
  @media (min-width: 1200px) {
    position: fixed;
    height: 100vh;
    width: 50vw;
  }
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

const form = css`
  margin-left: 50vw;
  padding: 4rem 2rem;
  height: fit-content;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1199px) {
    padding-top: 0;
    margin-left: 0;
  }
`;

const title = css`
  font-weight: 700;
  font-size: 2.125rem;
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-bottom: 2.3125rem;
`;

const link = css`
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

const codeInput = css`
  width: 200px;
  margin-right: 30px;
  @media (max-width: 600px) {
    width: 142.5px;
  }
`;

const sendCodeButton = css`
  width: 100px;
  margin-right: 20px;
  height: 40px;
  border-radius: 50vh;
  background: black;
  color: white;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  @media (max-width: 600px) {
    width: 80px;
    margin-right: 10px;
  }
`;

const checkCodeButton = css`
  width: 64px;
  margin-right: 56px;
  height: 40px;
  border-radius: 50vh;
  background: black;
  color: white;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  @media (max-width: 600px) {
    margin-right: 26px;
  }
`;

const submitButton = css`
  width: 21.875rem;
  height: 3.875rem;
  background: black;
  font-size: 1.25rem;
  border-radius: 0.625rem;
  margin-top: 50px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Signup;
