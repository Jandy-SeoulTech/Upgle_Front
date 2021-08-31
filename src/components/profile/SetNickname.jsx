/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isNickname } from '../../lib/util/validate';
import TextField from '../common/TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';

const SetNickname = ({
  onCheckNickname,
  onNicknameChanged,
  onSetNickname,
  nicknameChecked,
}) => {
  const m1200 = useMediaQuery('(max-width: 1200px)');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState(false);

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
    onSetNickname({ nickname });
  };

  return (
    <Grid container css={wrapper}>
      <Grid item xs={12} lg={6} css={[logoSection, m1200 && smallLogoSection]}>
        <Link to="/">
          <LogoWithTextTemp2 />
        </Link>
      </Grid>

      <Grid item container xs={12} lg={6} p={5} alignItems="center">
        <Grid item container sx={form}>
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center" sx={title}>
              닉네임 등록
            </Typography>
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Typography sx={helpText}>
              자신을 나타낼 수 있는 닉네임을 입력해주세요.
            </Typography>
          </Grid>

          <Grid item container xs={12} mb={4} justifyContent="center">
            <TextField
              size="small"
              fullWidth
              label="닉네임"
              placeholder="4 ~ 8자 제한"
              error={nicknameError || nicknameChecked === false}
              helperText={
                (nicknameError && '유효하지 않은 닉네임입니다.') ||
                (nicknameChecked === false && '이미 등록된 닉네임입니다.') ||
                (nicknameChecked === true && '사용 가능한 닉네임입니다.')
              }
              value={nickname}
              onChange={handleNicknameChange}
              sx={input}
            />
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!nicknameChecked}
              sx={submitButton}
            >
              결정
            </Button>
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
  margin-bottom: 18px;
`;

const helpText = css`
  padding: 10px 20px;
  width: fit-content;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-bottom: 24px;
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

export default SetNickname;
