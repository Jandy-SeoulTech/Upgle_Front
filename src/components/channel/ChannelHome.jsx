/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ChannelTalk from './ChannelTalk';
import ArchiveCard from './ArchiveCard';
import Button from '../common/Button';
import ChannelHomeChatCard from './ChannelHomeChatCard';
import { ReactComponent as ChatIcon } from '../../lib/assets/chatIcon.svg';
import PostCard from './PostCard';

const postList = [
  {
    id: 1,
    title: '[필독]게시글 작성시 주의사항입니다.',
    status: 'Notice',
    content:
      '저희 채널은 Nodejs 백엔드 개발자들을 위한 채널입니다. 질문시에 다른 언어 및 프레임워크는 자제해주시길 바랍니다',
    authorId: 8,
    channelId: 4,
    reservedAt: null,
    createdAt: '2021-09-08T16:08:07.873Z',
    updatedAt: null,
    author: {
      id: 8,
      email: 'iqeq1945@gmail.com',
      nickname: 'Gosu',
      profile: {
        profileImage: {
          src: 'https://storage.googleapis.com/jandy_bucket/algorithm_1631081812413.png',
        },
      },
    },
  },
  {
    id: 2,
    title: 'express 관련 질문입니다.',
    status: 'Open',
    content:
      '## express의 서버 시작\n-express 서버 시작은 httpCreateServer를 내부적으로 호출하나요?\n',
    authorId: 9,
    channelId: 4,
    reservedAt: null,
    createdAt: '2021-09-08T16:20:56.737Z',
    updatedAt: null,
    author: {
      id: 9,
      email: 'oio123@naver.com',
      nickname: '코린이',
      profile: {
        profileImage: {
          src: 'https://storage.googleapis.com/jandy_bucket/he_1631082153882.png',
        },
      },
    },
  },
  {
    id: 3,
    title: 'prisma관련 질문입니다.',
    status: 'Close',
    content:
      '## prismaORM관련 질문 \n-Prisma ORM에서 DB랑 연동하는데 .env 파일을 변경하는 방법이 따로 있나요?\n',
    authorId: 9,
    channelId: 4,
    reservedAt: null,
    createdAt: '2021-09-08T16:21:53.328Z',
    updatedAt: null,
    author: {
      id: 9,
      email: 'oio123@naver.com',
      nickname: '코린이',
      profile: {
        profileImage: {
          src: 'https://storage.googleapis.com/jandy_bucket/he_1631082153882.png',
        },
      },
    },
  },
];

const openRoom = [
  {
    id: 1,
    name: 'Express 기본기 알려드립니다.',
    createdAt: '2021-09-08T19:02:39.921Z',
    roomParticipant: [{ userId: 3 }, { userId: 17 }, { userId: 19 }],
    roomOwner: {
      id: 3,
      nickname: '코로나타도',
    },
  },
  {
    id: 2,
    name: 'Express 기본기 알려드립니다.',
    createdAt: '2021-09-08T19:02:39.921Z',
    roomParticipant: [{ userId: 3 }, { userId: 17 }, { userId: 19 }],
    roomOwner: {
      id: 3,
      nickname: '코로나타도',
    },
  },
  {
    id: 3,
    name: 'Express 기본기 알려드립니다.',
    createdAt: '2021-09-08T19:02:39.921Z',
    roomParticipant: [{ userId: 3 }, { userId: 17 }, { userId: 19 }],
    roomOwner: {
      id: 3,
      nickname: '코로나타도',
    },
  },
  {
    id: 4,
    name: 'Express 기본기 알려드립니다.',
    createdAt: '2021-09-08T19:02:39.921Z',
    roomParticipant: [{ userId: 3 }, { userId: 17 }, { userId: 19 }],
    roomOwner: {
      id: 3,
      nickname: '코로나타도',
    },
  },
];

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
    imgUrl:
      'https://pbs.twimg.com/profile_images/625698094345117696/pjhb6Zgx_400x400.jpg',
  },
  {
    title: '팝핀의 역사',
    date: '2021.08.11',
  },
  {
    title: '몸에 좋고 맛있는 샐러드 만드는 방법',
    date: '2021.07.02',
  },
  {
    title: '쉽게 못질 하는 방법',
    date: '2021.05.18',
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

const ChannerHome = ({ channel }) => {
  return (
    <Box css={channerHomeWrapper} spacing={2}>
      <ChannelTalk channel={channel} />
      <Box css={rightContent}>
        <Box css={contentWrapper}>
          <Box css={contentTitleWrapper}>
            <Typography css={contentTitle}>게시판</Typography>
            <Button>더보기</Button>
          </Box>
          <Box
            css={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
            }}
          >
            {postList.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        </Box>
        <Box css={contentWrapper}>
          <Box css={contentTitleWrapper}>
            <Box css={{ display: 'flex', alignItems: 'center' }}>
              <Typography css={contentTitle}>오픈된 채팅방</Typography>
              <ChatIcon css={{ marginLeft: '.5625rem' }} />
            </Box>
            <Button>더보기</Button>
          </Box>
          <Grid container spacing={3}>
            {openRoom.map((chatInfo, i) => (
              <Grid item key={i}>
                <ChannelHomeChatCard chatInfo={chatInfo} />
              </Grid>
            ))}
          </Grid>
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
`;

const contentWrapper = css`
  & + & {
    margin-top: 3.125rem;
  }
`;

export default ChannerHome;
