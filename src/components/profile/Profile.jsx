/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { ReactComponent as DepartmentIcon } from '../../lib/assets/departmentIcon.svg';
import { ReactComponent as EditProfileIcon } from '../../lib/assets/editProfileIcon.svg';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getRandomColor } from '../../lib/util/random';
import { useState } from 'react';
import { useEffect } from 'react';
import ModalUserCard from '../common/ModalUserCard';
import ReactLoading from 'react-loading';
import ProfileModal from '../common/ProfileModal';
import { useHistory } from 'react-router';
import ModalReviewCard from '../common/ModalReviewCard';
import ArchiveCard from '../common/ArchiveCard';

const Profile = ({
  getProfileLoading,
  getFollowersLoading,
  getFollowingsLoading,
  getReviewsLoading,
  getUserArchiveLoading,
  isMe,
  isFollowing,
  user,
  profile,
  followers,
  followings,
  reviews,
  userArchive,
  onFollow,
  onUnfollow,
  onProfileFollow,
  onProfileUnfollow,
  onGetFollowers,
  onGetFollowings,
  onGetReviews,
  onGetUserArchive,
}) => {
  const history = useHistory();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalTabs, setTabs] = useState([
    { key: 'followers', name: '팔로워', data: <></>, onTab: onGetFollowers },
    { key: 'followings', name: '팔로잉', data: <></>, onTab: onGetFollowings },
    { key: 'reviews', name: '전체 리뷰', data: <></>, onTab: onGetReviews },
  ]);
  const [currentProfileModalTab, setCurrentProfileModalTab] = useState('followers');

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archiveModalTabs, setArchiveModalTabs] = useState([
    { key: 'archives', name: '모아 보기', data: <></>, onTab: onGetUserArchive },
  ]);
  const [currentArchiveModalTab, setCurrentArchiveModalTab] = useState('archives');

  useEffect(() => {
    const newTabs = [...profileModalTabs];

    newTabs.find((tab) => tab.key === 'followers').data = getFollowersLoading ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      </Grid>
    ) : !followers || followers.length === 0 ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <Typography css={noContents}>{profile.nickname}님을 팔로우하는 유저가 없습니다.</Typography>
      </Grid>
    ) : (
      <Grid>
        {followers.map((follower, i) => (
          <ModalUserCard
            key={i}
            loggedInUser={user}
            profileUserId={profile.id}
            user={follower}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            onProfileFollow={onProfileFollow}
            onProfileUnfollow={onProfileUnfollow}
          />
        ))}
      </Grid>
    );

    newTabs.find((tab) => tab.key === 'followings').data = getFollowingsLoading ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      </Grid>
    ) : !followings || followings.length === 0 ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <Typography css={noContents}>{profile.nickname}님이 팔로우하는 유저가 없습니다.</Typography>
      </Grid>
    ) : (
      <Grid>
        {followings.map((following, i) => (
          <ModalUserCard
            key={i}
            loggedInUser={user}
            profileUserId={profile.id}
            user={following}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            onProfileFollow={onProfileFollow}
            onProfileUnfollow={onProfileUnfollow}
          />
        ))}
      </Grid>
    );

    newTabs.find((tab) => tab.key === 'reviews').data = getReviewsLoading ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      </Grid>
    ) : !reviews || reviews.length === 0 ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <Typography css={noContents}>{profile.nickname}님에 대한 리뷰가 없습니다.</Typography>
      </Grid>
    ) : (
      <Grid>
        {reviews.map((review, i) => (
          <ModalReviewCard key={i} review={review} />
        ))}
      </Grid>
    );

    setTabs(newTabs);
  }, [
    followers,
    followings,
    reviews,
    getFollowersLoading,
    getFollowingsLoading,
    getReviewsLoading,
  ]);

  useEffect(() => {
    const newTabs = [...archiveModalTabs];

    newTabs.find((tab) => tab.key === 'archives').data = getUserArchiveLoading ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      </Grid>
    ) : !userArchive || userArchive.length === 0 ? (
      <Grid container height="67vh" justifyContent="center" alignItems="center">
        <Typography css={noContents}>{profile.nickname}님이 작성한 글이 없습니다.</Typography>
      </Grid>
    ) : (
      <Grid item container columns={4} spacing="1.625rem" p="1.5625rem">
        {userArchive.map((archive) => (
          <Grid key={archive.id} item xs={1}>
            <ArchiveCard archive={archive} />
          </Grid>
        ))}
      </Grid>
    );

    setArchiveModalTabs(newTabs);
  }, [userArchive, getUserArchiveLoading]);

  const openProfileModal = (initialTab) => {
    setCurrentProfileModalTab(initialTab);
    setIsProfileModalOpen(true);
  };

  const openArchiveModal = (initialTab) => {
    setCurrentArchiveModalTab(initialTab);
    setIsArchiveModalOpen(true);
  };

  if (getProfileLoading) {
    return (
      <Grid container css={wrapper}>
        <ReactLoading
          type="spinningBubbles"
          color="black"
          style={{
            margin: '60px auto 0 auto',
            width: '60px',
            height: '60px',
          }}
        />
      </Grid>
    );
  }

  if (!profile) {
    return (
      <Grid container css={wrapper}>
        프로필이 없는 사용자입니다.
      </Grid>
    );
  }

  return (
    <Grid container css={wrapper}>
      <ProfileModal
        isOpen={isProfileModalOpen}
        setIsModalOpen={setIsProfileModalOpen}
        tabs={profileModalTabs}
        currentTab={currentProfileModalTab}
        setCurrentTab={setCurrentProfileModalTab}
      />
      <ProfileModal
        isOpen={isArchiveModalOpen}
        setIsModalOpen={setIsArchiveModalOpen}
        tabs={archiveModalTabs}
        currentTab={currentArchiveModalTab}
      />
      <Grid item container xs={12} css={widthContainer} justifyContent="center">
        <Grid item container css={leftProfile}>
          <Grid item container css={leftProfileTop}>
            <Avatar css={avatar} src={profile.profile.profileImage} />

            <Typography css={nickname}>{profile.nickname}</Typography>

            {(profile.profile.introduce === '' || profile.profile.department === '') && (
              <Grid item mb="35px"></Grid>
            )}

            {!isMe &&
              (!isFollowing ? (
                isFollowing !== undefined && (
                  <Button
                    sx={followButton}
                    onClick={() => {
                      onFollow({ followingId: profile.id });
                      onProfileFollow({ followingId: user.id, isMe: false });
                    }}
                  >
                    <AddIcon />
                    <Typography className="title">팔로우</Typography>
                  </Button>
                )
              ) : (
                <Button
                  sx={followingButton}
                  onClick={() => {
                    onUnfollow({ followingId: profile.id });
                    onProfileUnfollow({ followingId: user.id, isMe: false });
                  }}
                >
                  <CheckIcon />
                  <Typography className="title">팔로잉</Typography>
                </Button>
              ))}
            {profile.profile.introduce !== '' && (
              <Typography css={introduce}>{profile.profile.introduce}</Typography>
            )}
            {profile.profile.department !== '' && (
              <Grid item container css={department}>
                <DepartmentIcon />
                <Typography sx={{ marginLeft: '8px', fontSize: '14px' }}>
                  {profile.profile.department}
                </Typography>
              </Grid>
            )}
            {(profile.profile.introduce !== '' || profile.profile.department !== '') && (
              <Grid item mb={4}></Grid>
            )}
          </Grid>
          <Grid item container css={leftProfileBottom}>
            <Grid item container px={1}>
              <Grid item xs={12}>
                <Typography css={talentLabel}>잘하는 재능</Typography>
              </Grid>
              {profile.profile.wellTalent.length === 0 ? (
                <Grid item css={noTags}>
                  등록된 재능이 없습니다.
                </Grid>
              ) : (
                <Grid item css={talentTags}>
                  {profile.profile.wellTalent.map((talent, i) => (
                    <Typography key={i} css={talentTag}>
                      {talent.contents}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item container px={1}>
              <Grid item xs={12}>
                <Typography css={talentLabel}>관심있는 재능</Typography>
              </Grid>
              {profile.profile.interestTalent.length === 0 ? (
                <Grid item css={noTags}>
                  등록된 재능이 없습니다.
                </Grid>
              ) : (
                <Grid item css={talentTags}>
                  {profile.profile.interestTalent.map((talent, i) => (
                    <Typography key={i} css={talentTag}>
                      {talent.contents}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item container mt={6} mb={6} rowGap={2.5}>
              <Grid item container justifyContent="space-between" alignItems="center">
                <Typography css={followLabel}>팔로워</Typography>
                <Button sx={orangeSmallLabel} onClick={() => openProfileModal('followers')}>
                  {profile.followers.length}
                </Button>
              </Grid>
              <Grid item container justifyContent="space-between" alignItems="center">
                <Typography css={followLabel}>팔로잉</Typography>
                <Button sx={orangeSmallLabel} onClick={() => openProfileModal('followings')}>
                  {profile.followings.length}
                </Button>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                  sx={orangeLabel}
                  onClick={() => openProfileModal('reviews')}
                  css={{
                    ':hover .positiveReviews': { display: 'none' },
                    ':hover .allReviews': { display: 'block' },
                  }}
                >
                  <span className="positiveReviews">긍정 리뷰</span>
                  <span className="allReviews" css={{ display: 'none' }}>
                    전체 리뷰
                  </span>
                </Button>
                <Typography css={reviewNum}>{profile.reviewed.length}</Typography>
              </Grid>
              {profile.reviewed.map((review, i) => (
                <Typography key={i} css={reviewText}>
                  {review.content}
                </Typography>
              ))}
            </Grid>
          </Grid>
          {isMe && (
            <Grid item container justifyContent="center" alignItems="center" mb={2}>
              <Button sx={editProfileButton} onClick={() => history.push('/setting')}>
                <EditProfileIcon />
                <Typography
                  sx={{
                    fontFamily: 'Noto Sans KR',
                    marginLeft: '10px',
                    fontSize: '20px',
                    fontWeight: '700',
                  }}
                >
                  프로필 수정
                </Typography>
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid item container css={rightProfile}>
          <Grid item container xs={12} height="fit-content" mb={6.25}>
            <Grid item mb={2.5}>
              <Button sx={orangeLabel} onClick={() => openArchiveModal('archives')}>
                모아 보기
              </Button>
            </Grid>
            <Grid item container columns={4} spacing="22px">
              {userArchive?.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  아직 등록된 글이 없습니다.
                </Grid>
              ) : (
                userArchive?.slice(0, 8).map((archive) => (
                  <Grid key={archive.id} item xs={1}>
                    <ArchiveCard archive={archive} />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          <Grid item container xs={12} height="fit-content" mb={6.25}>
            <Grid item mb={4}>
              <Button sx={orangeLabel}>오픈 채널</Button>
            </Grid>
            <Grid item container columns={5}>
              {profile.admin.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  오픈된 채널이 없습니다.
                </Grid>
              ) : (
                profile.admin.map((channel, i) => (
                  <Grid
                    key={i}
                    item
                    xs={1}
                    css={channelCell}
                    onClick={() => (window.location.href = `/channel/${channel.id}/profile`)}
                  >
                    <Grid css={channelCard}>
                      <Box
                        sx={{
                          backgroundImage: `url(${channel.channelImage})`,
                          backgroundColor: getRandomColor(channel.name),
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '125px',
                          height: '125px',
                          borderRadius: '50%',
                          ':hover': {
                            backgroundImage: channel.channelImage
                              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%), url(${channel.channelImage})`
                              : 'linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%)',
                          },
                        }}
                      ></Box>
                      <Typography sx={channelName}>{channel.name}</Typography>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          <Grid item container xs={12} height="fit-content" mb={6.25}>
            <Grid item mb={4}>
              <Button sx={orangeLabel}>참여 채널</Button>
            </Grid>
            <Grid item container columns={5}>
              {profile.participants.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  참여하는 채널이 없습니다.
                </Grid>
              ) : (
                profile.participants.map((channel, i) => (
                  <Grid
                    key={i}
                    item
                    xs={1}
                    css={channelCell}
                    onClick={() => (window.location.href = `/channel/${channel.id}/profile`)}
                  >
                    <Grid css={channelCard}>
                      <Box
                        sx={{
                          backgroundImage: `url(${channel.channelImage})`,
                          backgroundColor: getRandomColor(channel.name),
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '125px',
                          height: '125px',
                          borderRadius: '50%',
                          ':hover': {
                            backgroundImage: channel.channelImage
                              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%), url(${channel.channelImage})`
                              : 'linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%)',
                          },
                        }}
                      ></Box>
                      <Typography sx={channelName}>{channel.name}</Typography>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const wrapper = css`
  margin-top: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f0f0f0;
`;

const widthContainer = css`
  padding: 72px 30px;
`;

const leftProfile = css`
  width: 364px;
  background-color: #fff;
  height: fit-content;
  border: 2px;
  border-radius: 5px;
  padding: 50px 25px 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const leftProfileTop = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const avatar = css`
  width: 180px;
  height: 180px;
  margin-bottom: 15px;
`;

const nickname = css`
  font-family: 'Barlow', 'Noto Sans KR', 'sans-serif' !important;
  font-size: 24px;
  font-weight: 700;
`;

const followButton = css`
  background-color: #ff511b;
  color: white;
  width: 240px;
  height: 50px;
  border: none;
  border-radius: 50px;
  padding: 0 8px;
  margin: 30px 0;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
    font-size: 20px;
    font-weight: 700;
    margin-left: 20px;
  }

  &:hover {
    border: none;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), #ff511b;
  }
`;

const followingButton = css`
  color: #ff511b;
  width: 240px;
  height: 50px;
  border-color: #ff511b;
  border-radius: 50px;
  padding: 0 8px;
  margin: 30px 0;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
    font-size: 20px;
    font-weight: 700;
    margin-left: 20px;
  }

  &:hover {
    border-color: #ff511b;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));
  }
`;

const introduce = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  align-self: flex-start;
  font-size: 14px;
  margin-top: 45px;
  margin-bottom: 20px;
`;

const department = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  display: flex;
  align-items: center;
`;

const leftProfileBottom = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 5px;
`;

const talentLabel = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const talentTags = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 12px;
  margin-bottom: 30px;
`;

const talentTag = css`
  border-radius: 20px;
  background-color: #7b7b7b;
  color: ${palette.white};
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  padding: 6px 17px;
`;

const followLabel = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 16px;
`;

const orangeLabel = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  background-color: #fff;
  color: black;
  font-size: 16px;
  font-weight: 700;
  height: 32px;
  border: 1px solid gray;
  border-radius: 32px;
  padding: 0 8px;
  &:hover {
    border-color: #ff511b;
    background-color: #ff511b;
    color: white;
  }
`;
const orangeSmallLabel = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  background-color: #fff;
  color: black;
  font-size: 14px;
  font-weight: 500;
  height: 24px;
  border: 1px solid gray;
  border-radius: 24px;
  padding: 0 8px;
  margin: 4px 0;
  width: fit-content;
  &:hover {
    border-color: #ff511b;
    background-color: #ff511b;
    color: white;
  }
`;

const reviewNum = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 14px;
`;

const reviewText = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 12px;
  margin-bottom: 20px;
`;

const editProfileButton = css`
  margin-top: 56px;
  color: ${palette.black};
  width: 95%;
  height: 50px;
  border-radius: 8px;
  background-color: ${palette.black};
  color: white;
  :hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const rightProfile = css`
  width: 776px;
  padding-left: 50px;
`;

const channelCell = css`
  width: 125px;
  height: 170px;
`;

const channelCard = css`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const channelName = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
  word-break: keep-all;
`;

const noTags = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 12px;
  color: #5f5f5f;
  text-align: center;
  margin: 10px auto 30px auto;
`;

const noContents = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 14px;
  color: #5f5f5f;
  text-align: center;
  height: 200px;
  line-height: 200px;
`;

export default Profile;
