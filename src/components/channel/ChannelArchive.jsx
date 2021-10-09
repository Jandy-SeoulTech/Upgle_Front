/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Avatar } from '@material-ui/core';
import Button from './../common/Button';
import { ReactComponent as PostWrite } from '../../lib/assets/postWrite.svg';
import { getDateString } from '../../lib/util/dateFormat';
import { useHistory } from 'react-router';
import { Image } from '@material-ui/icons';

const ArchiveItem = ({ channel, archive }) => {
  const history = useHistory();

  return (
    <Box
      css={postItem}
      onClick={() => {
        history.push(`/channel/${channel.id}/archive/${archive.id}`);
      }}
    >
      <Box css={postItemLeft}>
        <Box css={postTitle}>
          <Box css={{ display: 'flex' }}>
            <Typography className="title">{archive.title}</Typography>
          </Box>
          <Typography className="date">{getDateString(archive.createdAt)}</Typography>
        </Box>
        <Typography css={postContent}>{archive.content}</Typography>
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          {archive.authorId === channel.adminId ? (
            <>
              <div css={adminIconCss}>
                <p>관리자</p>
              </div>
              <Avatar
                src={archive.owner.profile.profileImage}
                css={{
                  width: '3.125rem',
                  height: '3.125rem',
                  border: '2px solid #04BD9E',
                }}
              />
            </>
          ) : (
            <>
              <Avatar
                src={archive.owner.profile.profileImage}
                css={{ width: '3.125rem', height: '3.125rem' }}
              />
            </>
          )}
          <Typography css={nicknameCss}>{archive.owner.nickname}</Typography>
        </Box>
      </Box>
      <Box
        css={postItemRight}
        className="avatar"
        onClick={() => history.push(`/profile/${archive.owner.id}`)}
      >
        {archive.images.length > 0 && <Image src={archive.images[0]} alt="" />}
      </Box>
    </Box>
  );
};

const ChannelArchive = ({ channelArchive, channel }) => {
  const history = useHistory();

  return (
    <Box css={backgroudWrapper}>
      <Box css={writeTitleWrapper}>
        <Button css={write} onClick={() => history.push(`/channel/${channel.id}/editArchive`)}>
          <PostWrite className="icon" css={{ marginRight: '.625rem' }} />
          요청하기
        </Button>
        <Typography css={writeTitle}>
          재능과 관련하여 배우고 싶은 내용을 요청해보세요. 재능 고수들이 공유 채팅을 열어 재능
          업글을 도와줄거예요!
        </Typography>
      </Box>
      {channelArchive?.length > 0 ? (
        <Box css={channelArchiveWrapper}>
          {channelArchive.map((archive) => (
            <ArchiveItem key={archive.id} channel={channel} archive={archive} />
          ))}
        </Box>
      ) : (
        <Typography>아직 등록된 요청글이 없습니다.</Typography>
      )}
    </Box>
  );
};

const backgroudWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
`;

const writeTitleWrapper = css`
  display: flex;
  flex-direction: column;
  margin: 5rem 1rem;
`;

const write = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: bold;
  font-size: 1.25rem;
  color: #ffffff;
  background: #000000;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 9.955rem;
  height: 3.4375rem;
  margin: auto;
`;

const writeTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  margin: 1.875rem auto auto auto;
`;

const channelArchiveWrapper = css`
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  margin-bottom: 6.25rem;
`;

const postItem = css`
  height: 15rem;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  & .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
  }
  :hover {
    background-color: #f0f0f0;
  }
`;

const postItemLeft = css`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.875rem 1.25rem;
`;

const postItemRight = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 11.25rem;
  height: 10.625rem;
  padding: 0;
  margin: 0;
`;

const postTitle = css`
  width: 100%;
  height: 1.5625rem;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: space-between;
  & .MuiTypography-root {
    padding-left: 0.9375rem;
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
  }
  .title {
    padding: 0;
    font-weight: 600;
    font-size: 1.25rem;
  }
  .date {
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #5f5f5f;
  }
`;

const postContent = css`
  flex: 1;
  margin-top: 2.34375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  color: #5f5f5f;
`;

const adminIconCss = css`
  width: 2.375rem;
  height: 1.125rem;
  background: #04bd9e;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 0.625rem;
    color: #ffffff;
  }
`;

const nicknameCss = css`
  margin-left: 0.75rem;
  font-family: 'Noto Sans KR';
  font-size: 0.8125rem;
  color: #000000;
`;

export default ChannelArchive;
