/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, Modal, Paper, Typography } from '@material-ui/core';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as UserPlus } from '../../lib/assets/userPlus.svg';
import { ReactComponent as MoreIcon } from '../../lib/assets/moreIcon.svg';
import { ReactComponent as Setting } from '../../lib/assets/setting.svg';
import palette from '../../lib/styles/palette';
import CheckIcon from '@material-ui/icons/Check';

import Button from '../common/Button';
import { useState } from 'react';
import { useHistory } from 'react-router';

const ChannelProfile = ({
  user,
  channel,
  collection,
  onEnterChannel,
  onExitChannel,
  isParticipant,
  isLiked,
  onLikeChannel,
  onUnLikeChannel,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box css={head}>
        <Avatar src={channel.channelImage.src} css={headeIcon} />
        <Box css={headContent}>
          <Box>
            <Typography css={headTitle}>
              {channel.name}{' '}
              {user.id === channel.adminId && (
                <Setting css={{ cursor: 'pointer' }} onClick={onEdit} />
              )}
            </Typography>
            <Typography css={headTotal}>
              재능 공유 멤버 {channel.participants.length + 1}
            </Typography>
            <Typography css={headLike}>
              좋아요 {channel.channellike.length}
            </Typography>
          </Box>
          {user.id !== channel.adminId && (
            <Box css={headButtonWrapper}>
              {isParticipant ? (
                <Button className="exitButton" onClick={onExitChannel}>
                  <CheckIcon className="icon" />
                  가입함
                </Button>
              ) : (
                <Button className="enterButton" onClick={onEnterChannel}>
                  <UserPlus className="icon" />
                  가입하기
                </Button>
              )}
              <Button
                className={isLiked ? 'likedButton' : 'likeButton'}
                onClick={isLiked ? onUnLikeChannel : onLikeChannel}
              >
                {isLiked ? (
                  <LikedButton className="icon" />
                ) : (
                  <LikeIcon className="icon" />
                )}
                좋아요
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box css={ChannelProfileWrapper}>
        <Box>
          <Typography css={sectionTitle}>채널 소개</Typography>
          <Typography css={channelDescription}>{channel.introduce}</Typography>
        </Box>
        <Box>
          <Typography css={sectionTitle}>채널 정보</Typography>
          <Box css={channelInfo}>
            <Typography css={channelCategory}>
              {channel.category.category.name}
            </Typography>
            <Grid container spacing={2} css={channelTagList}>
              {channel.tags.map((tag) => (
                <Grid item key={tag.tagId}>
                  <Typography css={channelTag}>{tag.tag.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography css={sectionTitle}>재능 공유 멤버</Typography>
          <Box css={channelMemberList}>
            <Box css={adminWrapper}>
              <Typography css={adminTitle}>관리자</Typography>
              <Avatar
                css={channelAdmin}
                src={
                  channel.admin['profile'] &&
                  channel.admin.profile.profileImage.src
                }
              />
              <Typography css={adminNickname}>
                {channel.admin.nickname}
              </Typography>
            </Box>
            <Box css={participantList}>
              {channel.participants.map((user) => (
                <>
                  {console.log(user)}
                  <Avatar
                    key={user.userId}
                    src={
                      user.user['profile'] && user.user.profile.profileImage.src
                    }
                    css={channelParticipant}
                  />
                </>
              ))}
            </Box>
            <MoreIcon
              css={morePersonButton}
              onClick={() => {
                setOpen(true);
              }}
            />
            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <Paper
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 400,
                  height: 400,
                  bgcolor: 'white',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                asdasd
              </Paper>
            </Modal>
          </Box>
        </Box>
        <Box>
          <Typography css={sectionTitle}>
            모아보기 <Button css={moreButton}>더보기</Button>
          </Typography>
          <Grid container spacing={3}>
            {collection.map((collection) => (
              <Grid item key={collection.id}>
                <Paper
                  css={[
                    channelCollection,
                    css`
                      background-image: url(${collection.image.src});
                    `,
                  ]}
                >
                  <Box css={channelCollectionLayer}>
                    <Typography css={collectionTitle}>
                      {collection.title}
                    </Typography>
                    <Typography css={collectionCreatedAt}>
                      {collection.createdAt}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

const head = css`
  margin-top: 8.4375rem;
  width: 100vw;
  padding: 5rem calc((100% - 59.125rem) / 2);
  background-color: #f0f0f0;
  display: flex;
`;

const headeIcon = css`
  width: 12.5rem;
  height: 12.5rem;
  margin-right: 3.125rem;
`;
const headContent = css`
  flex: 1;
`;

const headTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
`;
const headTotal = css`
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;
const headLike = css`
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const headButtonWrapper = css`
  display: flex;
  justify-content: flex-end;
  .MuiButton-root {
    width: 10.25rem;
    height: 3.5rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    font-family: 'Noto Sans KR';
    font-weight: bold;
    color: ${palette.white};
    font-size: 1.25rem;
    border: none;
  }
  .exitButton {
    background: ${palette.white};
    margin-right: 1.375rem;
    color: ${palette.orange};
    border: 2px solid ${palette.orange};
    &:hover {
      filter: brightness(0.85);
    }
  }
  .enterButton {
    background: ${palette.orange};
    margin-right: 1.375rem;
    &:hover {
      filter: brightness(0.85);
      border: none;
    }
  }
  .likedButton {
    background: ${palette.white};
    color: ${palette.orange};
    border: 2px solid ${palette.orange};
    &:hover {
      filter: brightness(0.85);
    }
  }
  .likeButton {
    color: ${palette.black};
    background: ${palette.white};
    border: 2px solid ${palette.black};
    &:hover {
      filter: brightness(0.95);
    }
  }
  .icon {
    width: 1.5625rem;
    height: 1.5625rem;
    margin-right: 0.9375rem;
  }
`;

const ChannelProfileWrapper = css`
  width: 100vw;
  padding: 0 calc((100% - 59.125rem) / 2);
  margin-bottom: 6.25rem;
`;

const sectionTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 3.75rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

const channelDescription = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1;
`;

const channelInfo = css`
  display: flex;
  align-items: flex-start;
`;
const channelCategory = css`
  width: fit-content;
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.125rem;
  font-weight: 600;
  margin-right: 5rem;
  padding: 0.3125rem 0.9375rem;
  border: 1px solid #000000;
  border-radius: 20px;
`;

const channelTagList = css`
  flex: 1;
`;

const channelTag = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1.25rem;
  padding: 0.3125rem 0.625rem;
  border: 1px solid #000000;
  background: #7b7b7b;
  border-radius: 20px;
  color: ${palette.white};
`;

const channelMemberList = css`
  display: flex;
  align-items: center;
  margin: 3rem 0;
`;

const adminWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1.5rem;
  margin-right: 3.625rem;
`;

const participantList = css`
  display: flex;
  overflow: hidden;
`;

const channelAdmin = css`
  width: 4.375rem;
  height: 4.375rem;
  border: 2px solid #04bd9e;
`;

const adminTitle = css`
  width: 2.375rem;
  padding: 2px 5px;
  background: #04bd9e;
  border-radius: 5px;
  font-family: 'Noto Sans KR';
  font-size: 0.625rem;
  color: ${palette.white};
  margin-bottom: 0.3125rem;
`;

const adminNickname = css`
  margin-top: 0.625rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.75rem;
`;

const channelParticipant = css`
  width: 3.75rem;
  height: 3.75rem;
  margin-right: 0.625rem;
`;

const morePersonButton = css`
  width: 3.75rem;
  height: 3.75rem;
  margin-right: 2.1rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const moreButton = css`
  width: 4.3125rem;
  height: 2rem;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 1rem;
`;

const channelCollection = css`
  width: 10.625rem;
  height: 15rem;
  background: #87eec3;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4.53975px;
`;

const channelCollectionLayer = css`
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.510208) 75.52%,
    rgba(0, 0, 0, 0.79) 100%
  );
  border-radius: 4.53975px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.709375rem 1.3125rem;
`;

const collectionTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${palette.white};
`;

const collectionCreatedAt = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.45rem;
  font-weight: 500;
  text-align: right;
  color: ${palette.white};
`;

export default ChannelProfile;
