/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import ChannelTalk from './ChannelTalk';
import ArchiveCard from '../common/ArchiveCard';
import Button from '../common/Button';
import ChannelHomeChatCard from './ChannelHomeChatCard';
import { ReactComponent as ChatIcon } from '../../lib/assets/chatIcon.svg';
import { ReactComponent as PostIcon } from '../../lib/assets/postIcon.svg';
import PostCard from './PostCard';
import { useHistory } from 'react-router';

const ChannerHome = ({ channel, postList, roomList, channelArchive }) => {
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

            <Button onClick={() => history.push(`/channel/${channel.id}/post`)}>더보기</Button>
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
            <Button onClick={() => history.push(`/channel/${channel.id}/archive`)}>더보기</Button>
          </Box>
          {channelArchive?.length > 0 ? (
            <Grid container spacing="1.25rem">
              {channelArchive?.map((archive, i) => (
                <Grid item key={i}>
                  <ArchiveCard archive={archive} width="10.625rem" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography css={[noContent, { height: '100px', lineHeight: '100px' }]}>
              아직 등록된 글이 없습니다.
            </Typography>
          )}
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
  padding-bottom: 6.25rem;
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
