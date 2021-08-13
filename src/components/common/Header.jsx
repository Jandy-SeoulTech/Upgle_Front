/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from './Button';
import SearchIcon from '@material-ui/icons/Search';
import {
  IconButton,
  Box,
  Divider,
  InputAdornment,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { memo, useState } from 'react';
import TextField from './TextField';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as AlarmOff } from '../../lib/assets/alarmOff.svg';
import { ReactComponent as alarmOn } from '../../lib/assets/alarmOn.svg';
import { ReactComponent as UserProfile } from '../../lib/assets/userProfile.svg';

const Header = ({ user, onLogout }) => {
  const history = useHistory();
  const [menuAnchor, setMenuAnchor] = useState();

  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  return (
    <Box
      sx={{
        padding: '0 50px',
        width: '100%',
        height: '65px',
        alignItems: 'center',
        boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <LogoWithTextTemp />
      <Link
        to="/talent"
        style={{
          fontWeight: 'bold',
          fontSize: '16px',
          lineHeight: '22px',
          textAlign: 'center',
          marginLeft: '45.36px',
          marginRight: '101.45px',
        }}
      >
        재능 찾기
      </Link>
      {user && (
        <Link
          to="/mychannel"
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: '22px',
            textAlign: 'center',
          }}
        >
          마이 채널
        </Link>
      )}
      <Box sx={{ flex: 1 }}></Box>
      <TextField
        sx={{
          width: '450px',
          marginRight: '196px',
          '.MuiInput-input': { fontSize: '12px' },
        }}
        placeholder="배우고 싶은 재능을 검색해보세요"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {user ? (
        <>
          <IconButton sx={{ paddingRight: '21px' }}>
            <AlarmOff />
          </IconButton>
          <ClickAwayListener
            onClickAway={() => {
              setMenuAnchor(null);
            }}
          >
            <Box>
              <IconButton sx={{ padding: 0 }} onClick={handleMenu}>
                <UserProfile />
              </IconButton>
              <Popper
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                placement="bottom-end"
              >
                <Paper
                  sx={{
                    width: '240px',
                    height: '360px',
                    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(14px)',
                  }}
                >
                  <MenuList
                    dense
                    sx={{ width: '100%', height: '100%', padding: 0 }}
                  >
                    <Box
                      sx={{
                        height: '125px',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '42px',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography fontSize="25px" fontWeight="bold">
                        {user.nickname}
                      </Typography>
                      <Typography fontSize="14px" color="#5F5F5F">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem sx={{ height: '45px', fontSize: '16px' }}>
                      <ListItemText>프로필</ListItemText>
                    </MenuItem>
                    <MenuItem sx={{ height: '45px', fontSize: '16px' }}>
                      <ListItemText>모아 보기</ListItemText>
                    </MenuItem>
                    <MenuItem sx={{ height: '45px', fontSize: '16px' }}>
                      <ListItemText>설정</ListItemText>
                    </MenuItem>
                    <Divider />
                    <Box
                      sx={{
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button onClick={onLogout} sx={{ width: '102px' }}>
                        로그아웃
                      </Button>
                    </Box>
                  </MenuList>
                </Paper>
              </Popper>
            </Box>
          </ClickAwayListener>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Button sx={{ marginRight: '21px' }}>로그인</Button>
          </Link>
          <Link to="/signup">
            <Button>회원 가입</Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default memo(Header);
