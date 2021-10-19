/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, Avatar, Pagination } from '@material-ui/core';
import Button from './../common/Button';
import { ReactComponent as PostWrite } from '../../lib/assets/postWrite.svg';
import { getDateString } from '../../lib/util/dateFormat';
import { useHistory } from 'react-router';
import PostStatusIcon from '../post/PostStatusIcon';

const categories = [
  {
    type: 'All',
    title: '전체',
  },
  {
    type: 'Open',
    title: '채팅방 오픈',
  },
  {
    type: 'Reservation',
    title: '채팅방 예약',
  },
  {
    type: 'Close',
    title: '채팅 대기',
  },
  {
    type: 'Archived',
    title: '해결 완료',
  },
];

const PostItem = ({ channel, post }) => {
  const history = useHistory();

  return (
    <Box
      css={postItem}
      onClick={() => {
        history.push(`/channel/${channel.id}/post/${post.id}`);
      }}
    >
      <Box css={postItemLeft}>
        <Box css={postTitle}>
          <Box css={{ display: 'flex' }}>
            <PostStatusIcon status={post.status} />
            <Typography className="title">{post.title}</Typography>
          </Box>
          <Typography className="date">{getDateString(post.createdAt)}</Typography>
        </Box>
        <Typography css={postContent}>{post.content}</Typography>
      </Box>
      <Box
        css={postItemRight}
        className="avatar"
        onClick={() => history.push(`/profile/${post.author.id}`)}
      >
        {post.authorId === channel.adminId ? (
          <>
            <div css={adminIconCss}>
              <p>관리자</p>
            </div>
            <Avatar
              src={post.author.profile.profileImage}
              css={{
                width: '3.125rem',
                height: '3.125rem',
                margin: '.3125rem auto 0 auto',
                border: '2px solid #04BD9E',
              }}
            />
          </>
        ) : (
          <>
            <Avatar
              src={post.author.profile.profileImage}
              css={{ width: '3.125rem', height: '3.125rem', margin: '0 auto' }}
            />
          </>
        )}
        <Typography css={nicknameCss}>{post.author.nickname}</Typography>
      </Box>
    </Box>
  );
};

const ChannelPostList = ({ postList, channel, onQueryChange, type, page, lastPage }) => {
  const history = useHistory();

  return (
    <Box css={backgroudWrapper}>
      <Box css={writeTitleWrapper}>
        <Button css={write} onClick={() => history.push(`/channel/${channel.id}/editPost`)}>
          <PostWrite className="icon" css={{ marginRight: '.625rem' }} />
          요청하기
        </Button>
        <Typography css={writeTitle}>
          재능과 관련하여 배우고 싶은 내용을 요청해보세요. 재능 고수들이 공유 채팅을 열어 재능
          업글을 도와줄거예요!
        </Typography>
      </Box>
      <Box css={categoryList}>
        {categories.map((category) => (
          <Typography
            css={categoryItem(type === category.type)}
            onClick={() => {
              onQueryChange('type', category.type);
            }}
          >
            {category.title}
          </Typography>
        ))}
      </Box>
      {postList?.length > 0 ? (
        <>
          <Box css={postListWrapper}>
            {postList.map((post) => (
              <PostItem key={post.id} channel={channel} post={post} />
            ))}
          </Box>
          <Pagination
            css={pagination}
            count={lastPage}
            page={page}
            showFirstButton
            showLastButton
            onChange={(e, page) => {
              onQueryChange('page', parseInt(page, 10));
            }}
          />
        </>
      ) : (
        <Box css={notFound}>글이 존재하지 않습니다.</Box>
      )}
    </Box>
  );
};

const backgroudWrapper = css`
  margin-top: 8.4375rem;
  background: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
  padding-top: 5rem;
`;

const writeTitleWrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
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

const categoryList = css`
  display: flex;
  justify-content: space-around;
  padding-bottom: 1.875rem;
  border-bottom: 2px solid black;
`;

const categoryItem = (isChecked) => css`
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 1.25rem;
  color: ${isChecked ? '#000' : '#7B7B7B'};
  cursor: pointer;
`;

const postListWrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.496875rem;
`;

const notFound = css`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 1rem;
  margin: 14.9375rem 0;
  display: flex;
  justify-content: center;
`;

const postItem = css`
  height: 10.625rem;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
  width: 70%;
  height: 10.625rem;
`;

const postItemRight = css`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 11.25rem;
  height: 10.625rem;
`;

const postTitle = css`
  height: 1.5625rem;
  margin: 2rem 0 0.625rem 1.875rem;
  display: flex;
  justify-content: space-between;
  & .MuiTypography-root {
    padding-left: 0.9375rem;
    font-family: 'Noto Sans KR';
    font-style: normal;
  }
  .title {
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
  height: 2.75rem;
  margin: 1.4375rem 0.625rem 0 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'Noto Sans KR';
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
  margin-top: 0.75rem;
  text-align: center;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  font-size: 0.8125rem;
  color: #000000;
`;

const pagination = css`
  display: flex;
  justify-content: center;
  padding-bottom: 12.5rem;
`;

export default ChannelPostList;
