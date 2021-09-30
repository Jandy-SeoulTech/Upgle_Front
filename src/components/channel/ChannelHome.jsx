/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ChannelTalk from './ChannelTalk';
import ArchiveCard from './ArchiveCard';
import Button from '../common/Button';
import ChannelHomeChatCard from './ChannelHomeChatCard';
import { ReactComponent as ChatIcon } from '../../lib/assets/chatIcon.svg';
import { ReactComponent as PostIcon } from '../../lib/assets/postIcon.svg';
import PostCard from './PostCard';
import { useHistory } from 'react-router';

const archived = [
  {
    title: '머핀이 잘 부풀지 않을때 어떻게 해야할까?',
    date: '2021.09.07',
    imgUrl:
      'https://i2.wp.com/smittenkitchen.com/wp-content/uploads//2010/08/perfect-blueberry-muffins.jpg?fit=750%2C500&ssl=1',
  },
  {
    title: '멋있게 춤추기 위해 알아야 하는 기본 동작',
    date: '2021.08.14',
    imgUrl: 'https://pbs.twimg.com/profile_images/625698094345117696/pjhb6Zgx_400x400.jpg',
  },
  {
    title: '몸에 좋고 맛있는 샐러드 만드는 방법',
    date: '2021.07.02',
  },
  {
    title: '홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 알려드립니다!',
    date: '2021.03.18',
  },
  {
    title: '유연성을 기르기 위한 여러가지 동작',
    date: '2021.01.04',
  },
  {
    title: '사실적으로 눈 그리는 방법',
    date: '2020.12.11',
    imgUrl: 'https://t1.daumcdn.net/cfile/blog/9905734D5C01316F32',
  },
];

const ChannerHome = ({ channel, postList, roomList }) => {
  const history = useHistory();

  return (
    <Box css={channerHomeWrapper} spacing={2}>
      <ChannelTalk channel={channel} />
      <Box css={rightContent}>
        <Box css={contentWrapper}>
          <Box css={contentTitleWrapper}>
            <Typography css={contentTitle}>
              재능 공유 요청 <PostIcon css={{ marginLeft: '.5625rem' }} />
            </Typography>

            <Button onClick={() => history.push(`/channel/${channel.id}/postList`)}>더보기</Button>
          </Box>
          {postList?.length > 0 ? (
            <Box
              css={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
              }}
            >
              {postList?.map((post) => (
                <PostCard key={post.id} channelId={channel.id} post={post} />
              ))}
            </Box>
          ) : (
            <Typography css={[noContent, { height: '60px', lineHeight: '60px' }]}>
              등록된 요청이 없습니다.
            </Typography>
          )}
        </Box>
        <Box css={contentWrapper}>
          <Box css={contentTitleWrapper}>
            <Box css={{ display: 'flex', alignItems: 'center' }}>
              <Typography css={contentTitle}>오픈된 채팅방</Typography>
              <ChatIcon css={{ marginLeft: '.4rem' }} />
            </Box>
            <Button>더보기</Button>
          </Box>
          {roomList?.length > 0 ? (
            <Grid container spacing={3}>
              {roomList?.openRoom.map((chatInfo, i) => (
                <Grid item key={i}>
                  <ChannelHomeChatCard chatInfo={chatInfo} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography css={[noContent, { height: '100px', lineHeight: '100px' }]}>
              오픈된 채팅방이 없습니다.
            </Typography>
          )}
        </Box>
        <Box css={contentWrapper}>
          <Box css={contentTitleWrapper}>
            <Typography css={contentTitle}>모아보기</Typography>
            <Button>더보기</Button>
          </Box>
          <Grid container spacing={3}>
            {archived.map((post, i) => (
              <Grid item key={i}>
                <ArchiveCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const channerHomeWrapper = css`
  margin-top: 8.4375rem;
  padding: 1rem calc((100% - 71.25rem) / 2);
  background-color: #fafafc;
  display: flex;
`;

const rightContent = css`
  flex: 1;
  padding-left: 1.9375rem;
`;

const contentTitleWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.9375rem;
`;

const contentTitle = css`
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
`;

const contentWrapper = css`
  & + & {
    margin-top: 3.125rem;
  }
`;

const noContent = css`
  text-align: center;
  width: 100%;
  font-family: 'Noto Sans KR';
  color: #5f5f5f;
`;

export default ChannerHome;
