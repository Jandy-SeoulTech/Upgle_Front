/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { ReactComponent as LikeIcon } from '../../lib/assets/likeIcon.svg';
import { ReactComponent as LikedButton } from '../../lib/assets/likedButton.svg';
import { ReactComponent as UserPlus } from '../../lib/assets/userPlus.svg';
import { ReactComponent as MoreIcon } from '../../lib/assets/moreIcon.svg';
import { ReactComponent as Setting } from '../../lib/assets/setting.svg';
import { ReactComponent as SearchIcon } from '../../lib/assets/searchIcon.svg';
import palette from '../../lib/styles/palette';
import CheckIcon from '@material-ui/icons/Check';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileModal from '../common/ProfileModal';
import ModalUserCard from '../common/ModalUserCard';
import ArchiveCard from '../common/ArchiveCard';
import AdminModalUserCard from '../common/AdminModalUserCard';

const ChannelProfile = ({
  user,
  channel,
  channelArchive,
  onEnterChannel,
  onExitChannel,
  isParticipant,
  isLiked,
  onLikeChannel,
  onUnLikeChannel,
  onEdit,
  onFollow,
  onUnfollow,
  onProfileFollow,
  onProfileUnfollow,
  onBanUser,
  onPassAdmin,
}) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabs, setTabs] = useState([{ key: 'members', name: '재능 공유 멤버', data: <></> }]);
  const [currentTab, setCurrentTab] = useState('members');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminModalTabs, setAdminModalTabs] = useState([
    { key: 'admin', name: '채널 멤버 관리', data: <></> },
  ]);
  const [currentAdminModalTab, setCurrentAdminModalTab] = useState('admin');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const newTabs = [...tabs];
    if (channel?.participants) {
      newTabs.find((tab) => tab.key === 'members').data =
        channel.participants.length === 0 ? (
          <Grid container height="67vh" justifyContent="center" alignItems="center">
            <ModalUserCard
              loggedInUser={user}
              profileUserId={channel.admin.id}
              user={channel.admin}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              onProfileFollow={onProfileFollow}
              onProfileUnfollow={onProfileUnfollow}
            />
          </Grid>
        ) : (
          <Grid>
            <ModalUserCard
              loggedInUser={user}
              profileUserId={channel.admin.id}
              user={channel.admin}
              onFollow={onFollow}
              onUnfollow={onUnfollow}
              onProfileFollow={onProfileFollow}
              onProfileUnfollow={onProfileUnfollow}
            />
            {channel.participants.map((member) => (
              <ModalUserCard
                key={`modal-user-card-${member.id}`}
                loggedInUser={user}
                profileUserId={member.userId}
                user={member.user}
                onFollow={onFollow}
                onUnfollow={onUnfollow}
                onProfileFollow={onProfileFollow}
                onProfileUnfollow={onProfileUnfollow}
              />
            ))}
          </Grid>
        );
    }
    setTabs(newTabs);
  }, [channel]);

  useEffect(() => {
    const newTabs = [...adminModalTabs];
    const members = channel.participants.filter((member) => member.user.nickname.includes(keyword));
    if (channel?.participants) {
      newTabs.find((tab) => tab.key === 'admin').data =
        channel.participants.length === 0 ? (
          <Grid container height="67vh" justifyContent="center" alignItems="center">
            <Typography css={noContents}>채널에 참여자가 없습니다.</Typography>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <TextField
              sx={search}
              placeholder="멤버를 검색해보세요."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {members.length === 0 ? (
              <Typography css={noContents}>검색된 멤버가 없습니다.</Typography>
            ) : (
              members.map((member) => (
                <AdminModalUserCard
                  key={`admin-modal-user-card-${member.id}`}
                  user={member.user}
                  onBanUser={onBanUser}
                  onPassAdmin={onPassAdmin}
                  setIsAdminModalOpen={setIsAdminModalOpen}
                />
              ))
            )}
          </Grid>
        );
    }
    setAdminModalTabs(newTabs);
  }, [channel, keyword]);

  return (
    <>
      <Box css={head(isParticipant)}>
        <Avatar src={channel.channelImage} css={headeIcon} />
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
            <Typography css={headLike}>좋아요 {channel.channelLike.length}</Typography>
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
                {isLiked ? <LikedButton className="icon" /> : <LikeIcon className="icon" />}
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
            <Typography css={channelCategory}>{channel.category.name}</Typography>
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
          <Typography css={[sectionTitle, { justifyContent: 'flex-start', columnGap: '1.125rem' }]}>
            재능 공유 멤버
            {user.id === channel.adminId && (
              <Setting
                css={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsAdminModalOpen(true);
                }}
              />
            )}
          </Typography>
          <Box css={channelMemberList}>
            <Box css={adminWrapper}>
              <Typography css={adminTitle}>관리자</Typography>
              <Avatar
                css={channelAdmin}
                src={channel.admin['profile'] && channel.admin.profile.profileImage}
              />
              <Typography css={adminNickname}>{channel.admin.nickname}</Typography>
            </Box>
            <Box css={participantList}>
              {channel.participants.map((user) => (
                <Avatar
                  key={user.userId}
                  src={user.user['profile'] && user.user.profile.profileImage}
                  css={channelParticipant}
                />
              ))}
            </Box>
            <MoreIcon
              css={morePersonButton}
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <ProfileModal
              isOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              sxOverlay={{ marginTop: '8.4375rem' }}
              sxContent={{ height: '75vh' }}
            />
            <ProfileModal
              isOpen={isAdminModalOpen}
              setIsModalOpen={setIsAdminModalOpen}
              tabs={adminModalTabs}
              currentTab={currentAdminModalTab}
              setCurrentTab={setCurrentAdminModalTab}
              sxOverlay={{ marginTop: '8.4375rem' }}
              sxContent={{ height: '75vh' }}
            />
          </Box>
        </Box>
        <Box>
          <Typography css={sectionTitle}>
            모아보기{' '}
            <Button css={moreButton} onClick={() => history.push(`/channel/${channel.id}/archive`)}>
              더보기
            </Button>
          </Typography>
          {channelArchive?.length > 0 ? (
            <Grid container spacing={3} columns={5}>
              {channelArchive?.map((archive) => (
                <Grid item key={archive.id}>
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
    </>
  );
};

const head = (isParticipant) => css`
  margin-top: ${isParticipant ? '8.4375rem' : '3.75rem'};
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
      border: 2px solid ${palette.orange};
      color: ${palette.orange};
      background: ${palette.white};
      filter: brightness(0.95);
    }
  }
  .enterButton {
    background: ${palette.orange};
    margin-right: 1.375rem;
    &:hover {
      background: ${palette.orange};
      filter: brightness(0.85);
      border: none;
    }
  }
  .likedButton {
    background: ${palette.white};
    color: ${palette.orange};
    border: 2px solid ${palette.orange};
    &:hover {
      background: ${palette.white};
      color: ${palette.orange};
      border: 2px solid ${palette.orange};
      filter: brightness(0.85);
    }
  }
  .likeButton {
    color: ${palette.black};
    background: ${palette.white};
    border: 2px solid ${palette.black};
    &:hover {
      color: ${palette.black};
      background: ${palette.white};
      border: 2px solid ${palette.black};
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

const noContent = css`
  text-align: center;
  width: 100%;
  font-family: 'Noto Sans KR';
  color: #5f5f5f;
`;

const noContents = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 14px;
  color: #5f5f5f;
  text-align: center;
  height: 200px;
  line-height: 200px;
`;

const search = css`
  width: 90%;
  margin: 1rem auto;

  & .MuiOutlinedInput-root {
    & fieldset {
      border: 1px solid #7b7b7b;
      border-radius: 1.625rem;
    }
    &:hover fieldset {
      border-color: #7b7b7b;
    }
    &.Mui-focused fieldset {
      border-color: #7b7b7b;
    }
  }
`;

export default ChannelProfile;
