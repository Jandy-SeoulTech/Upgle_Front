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
      url: `/channel/${channel.id}/profile`,
    },
    {
      title: '채널 홈',
      url: `/channel/${channel.id}/home`,
    },
    {
      title: '재능 공유 요청',
      url: `/channel/${channel.id}/post`,
    },
    {
      title: '재능 공유 채팅',
      url: `/channel/${channel.id}/profile`,
    },
    {
      title: '모아 보기',
      url: `/channel/${channel.id}/profile`,
    },
  ];

  return (
    <Box
      css={channelNav({
        isProfile: pathname === `/channel/${channel.id}/profile`,
        scrolled: scrollPosition !== 0,
      })}
    >
      {isParticipant &&
        channelNavReducer.map((item, index) => (
          <Typography
            key={index}
            css={navItem}
            onClick={() => {
              window.scrollTo(0, 0);
              history.push(item.url);
            }}
          >
            {item.title}
          </Typography>
        ))}
    </Box>
  );
};

const channelNav = ({ isProfile, scrolled }) => css`
  position: fixed;
  top: 3.75rem;
  width: 100%;
  height: 4.6875rem;
  background: ${isProfile ? '#f0f0f0' : '#FAFAFC'};
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
