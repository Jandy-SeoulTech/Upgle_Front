import React, { useState } from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { isNickname } from '../../lib/util/validate';
import TextField from '../common/TextField';
import Button from '../common/Button';
import { ReactComponent as Logo } from '../../lib/assets/logoWithTextTemp.svg';

const SetNickname = ({
  onCheckNickname,
  onNicknameChanged,
  onSetNickname,
  nicknameChecked,
}) => {
  const mobile = useMediaQuery('(max-width:960px)');
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
    <Grid
      container
      alignItems={mobile ? 'start' : 'center'}
      height="100vh"
      py={0}
    >
      <Grid
        item
        container
        alignSelf="start"
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        height={mobile ? '48px' : '100vh'}
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
        p={mobile ? 2 : 5}
        rowGap={mobile ? 4 : 8}
        height="fit-content"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Typography variant="h4" textAlign="center">
            닉네임 등록
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography textAlign="center">
            자신을 나타낼 수 있는 닉네임을 입력해주세요.
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
              disabled={!nicknameChecked}
            >
              결정
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SetNickname;
