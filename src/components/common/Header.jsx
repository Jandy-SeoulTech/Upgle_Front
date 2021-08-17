/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from './Button';
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
import { memo, useEffect, useState } from 'react';
import TextField from './TextField';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as AlarmOff } from '../../lib/assets/alarmOff.svg';
import { ReactComponent as alarmOn } from '../../lib/assets/alarmOn.svg';
import { ReactComponent as UserProfile } from '../../lib/assets/userProfile.svg';
import { ReactComponent as SearchIcon } from '../../lib/assets/searchIcon.svg';
import palette from '../../lib/styles/palette';

const Header = ({ user, onLogout }) => {
  const history = useHistory();
  const [menuAnchor, setMenuAnchor] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const handleMenu = (e) => {
    if (!e) return;
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  return (
    <Box css={[headerWrapper, scrollPosition !== 0 && headerScrolled]}>
      <LogoWithTextTemp css={logo} onClick={() => history.push('/')} />
      <Link to="/talent" css={navItem}>
        재능 찾기
      </Link>
      {user && (
        <Link to="/mychannel" css={navItem}>
          마이 채널
        </Link>
      )}
      <TextField
        sx={search}
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
          <IconButton sx={{ marginRight: '9px' }}>
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
                <Paper sx={menuWrapper}>
                  <MenuList dense>
                    <Box className="userInfo">
                      <Typography fontSize="25px" fontWeight="bold">
                        {user.nickname}
                      </Typography>
                      <Typography fontSize="14px" color="#5F5F5F">
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem>
                      <ListItemText>프로필</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemText>모아 보기</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemText>설정</ListItemText>
                    </MenuItem>
                    <Divider />
                    <Box className="menuFotter">
                      <Button onClick={onLogout}>로그아웃</Button>
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

const headerWrapper = css`
  padding: 0 50px;
  width: 100vw;
  height: 65px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
`;

const headerScrolled = css`
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
`;

const logo = css`
  flex-shrink: 0;
  cursor: pointer;
`;

const navItem = css`
  width: 160px;
  height: 65px;
  line-height: 65px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: ${palette.black};
  transition: all 0.1s;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    color: ${palette.orange};
    border-bottom: 3px solid ${palette.orange};
  }
  &:active {
    color: ${palette.black};
  }
`;

const search = css`
  width: calc(100% / 6 + 147px);
  margin-left: auto;
  margin-right: 5%;
  .MuiInput-root {
    &::before {
      border-bottom: 2px solid ${palette.black} !important;
    }
    &::after {
      border-bottom: 2px solid ${palette.black} !important;
    }
  }
  .MuiInput-input {
    font-size: 12px;
  }
`;

const menuWrapper = css`
  width: 240px;
  height: 360px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  transform: translateY(14px);
  .MuiList-root {
    width: 100%;
    height: 100%;
    padding: 0;
    .userInfo {
      height: 125px;
      display: flex;
      flex-direction: column;
      padding-left: 42px;
      align-items: flex-start;
      justify-content: center;
    }
    .MuiListItem-root {
      height: 45px;
      font-size: 16px;
      padding-left: 26px;
      &:hover {
        .MuiTypography-root {
          font-weight: bold;
        }
      }
    }
    .menuFotter {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .MuiButton-root {
        width: 102px;
      }
    }
  }
`;

export default memo(Header);
