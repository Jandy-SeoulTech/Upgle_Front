/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

const ChannelNav = ({ channel, isParticipant }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  });

  const channelNavReducer = [
    {
      title: '채널 프로필',
      url: `/channelProfile/${channel.id}`,
    },
    {
      title: '채널 홈',
      url: `/channelHome/${channel.id}`,
    },
    {
      title: '재능 공유 요청',
      url: '/channelProfile',
    },
    {
      title: '재능 고융 채팅',
      url: '/channelProfile',
    },
    {
      title: '모아 보기',
      url: '/channelProfile',
    },
  ];

  return (
    <Box
      css={channelNav({
        isHome: pathname === `/channelHome/${channel.id}`,
        scrolled: scrollPosition !== 0,
      })}
    >
      {isParticipant &&
        channelNavReducer.map((item, index) => (
          <Typography
            key={index}
            css={navItem}
            onClick={() => {
              history.push(item.url);
            }}
          >
            {item.title}
          </Typography>
        ))}
    </Box>
  );
};

const channelNav = ({ isHome, scrolled }) => css`
  position: fixed;
  top: 3.75rem;
  width: 100%;
  height: 4.6875rem;
  background: ${isHome ? '#FAFAFC' : '#f0f0f0'};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 calc((100% - 69rem) / 2);
  box-shadow: ${scrolled && '0px 1px 10px rgba(0, 0, 0, 0.25);'};
  z-index: 900;
`;

const navItem = css`
  font-family: 'Noto Sans KR';
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  & + & {
    margin-left: 3.125rem;
  }
`;

export default ChannelNav;
