/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { ReactComponent as DepartmentIcon } from '../../lib/assets/departmentIcon.svg';
import { ReactComponent as EditProfileIcon } from '../../lib/assets/editProfileIcon.svg';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getRandomColor } from '../../lib/util/random';
import { useState } from 'react';
import Modal from '../common/Modal';
import { useEffect } from 'react';
import ModalUserCard from '../common/ModalUserCard';

const Profile = ({
  getProfileLoading,
  isMe,
  isFollowing,
  user,
  profile,
  followers,
  followings,
  onFollow,
  onUnfollow,
  onGetFollowers,
  onGetFollowings,
  errorMessage,
}) => {
  const { id } = useParams();
  const m1200 = useMediaQuery('(max-width: 1199px)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabs, setTabs] = useState([
    { key: 'followers', name: '팔로워', data: <></>, onTab: onGetFollowers },
    { key: 'followings', name: '팔로잉', data: <></>, onTab: onGetFollowings },
    { key: 'reviews', name: '전체 리뷰', data: <></> },
  ]);
  const [currentTab, setCurrentTab] = useState('followers');

  useEffect(() => {
    const newTabs = [...tabs];
    if (followers) {
      newTabs.find((tab) => tab.key === 'followers').data = (
        <Grid>
          {followers.length === 0 ? (
            <Typography textAlign="center" marginTop="60px">
              {profile?.nickname}님을 팔로우하는 유저가 없습니다.
            </Typography>
          ) : (
            followers.map((follower, i) => (
              <ModalUserCard
                key={i}
                loggedInUser={user}
                user={follower}
                onFollow={onFollow}
                onUnfollow={onUnfollow}
              />
            ))
          )}
        </Grid>
      );
    }
    if (followings) {
      newTabs.find((tab) => tab.key === 'followings').data = (
        <Grid>
          {followings.length === 0 ? (
            <Typography textAlign="center" marginTop="60px">
              {profile?.nickname}님이 팔로우하는 유저가 없습니다.
            </Typography>
          ) : (
            followings.map((following, i) => (
              <ModalUserCard
                key={i}
                loggedInUser={user}
                user={following}
                onFollow={onFollow}
                onUnfollow={onUnfollow}
              />
            ))
          )}
        </Grid>
      );
    }
    setTabs(newTabs);
  }, [followers, followings]);

  const reviews = [
    '팝핀 정말 잘춰요~기본기를 정말 탄탄하게 알려줘서 처음 배우는 사람도 재미있게 배울 수 있어요! 댄싱퀸펭귄님 최고!',
    '진짜 너무 친절하세요~제가 못질은 처음이라서 질문을 계속 물어봐서 귀찮을만도 한데 하나하나 알려주서 잘 배울 수 있었어요. 못질 기본기 없으신 분들은 펭귄님 채널 추천!!!',
  ];
  const rightInfosA = [
    {
      title: '머핀이 잘 부풀지 않을때 어떻게 해야할까?',
      date: '2021.08.11',
      imgUrl: 'https://picsum.photos/200',
    },
    {
      title:
        '홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지',
      date: '2021.08.11',
      imgUrl: 'https://picsum.photos/200',
    },
    {
      title: '머핀이 잘?',
      date: '2021.08.11',
    },
    {
      title: '머핀이 잘 부풀지 않을때 어떻게 해야할까',
      date: '2021.08.11',
    },
    {
      title: '잘 부풀지 않을때 어떻게 해야할까?',
      date: '2021.08.11',
    },
    {
      title: '머핀이 잘 부풀지 않을때 어떻게 해야할까??',
      date: '2021.08.11',
    },
    {
      title: '머핀이 잘 부풀지 않을때 어떻게 해야할까???',
      date: '2021.08.11',
    },
    {
      title: '머핀이 잘 부풀지 않을때 어떻게 해야할까?',
      date: '2021.08.11',
      imgUrl: 'https://picsum.photos/200',
    },
  ];
  const rightInfosB = [
    { name: '팝핀으로 우주 정복하기', imgUrl: 'https://picsum.photos/100' },
    { name: '팝핀으로 우주' },
    { name: '팝핀으로 우주 정복하기', imgUrl: 'https://picsum.photos/100' },
    { name: '팝핀으로 우주 정복하기' },
  ];
  const rightInfosC = [
    {
      name: '건강한 다이어트 식단 만들어 먹기',
      imgUrl: 'https://picsum.photos/100',
    },
    {
      name: '초보자도 쉽게 하는 목공 교실',
      imgUrl: 'https://picsum.photos/100',
    },
    { name: '인물사진 기초 클래스', imgUrl: 'https://picsum.photos/100' },
  ];

  const openModal = (initialTab) => {
    switch (initialTab) {
      case 'followers':
        onGetFollowers();
        break;
      case 'followings':
        onGetFollowings();
        break;
      default:
        break;
    }
    setCurrentTab(initialTab);
    setIsModalOpen(true);
  };

  if (getProfileLoading) {
    return (
      <Grid container css={wrapper}>
        프로필 가져오는 중...
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
      <Modal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Grid item container xs={12} css={widthContainer}>
        <Grid item container xs={3} css={leftProfile}>
          <Grid item container css={leftProfileTop}>
            <Grid item>
              <Avatar css={avatar} src={profile.profile.profileImage.src} />
            </Grid>
            <Grid item>
              <Typography css={nickname}>{profile.nickname}</Typography>
            </Grid>
            {!isMe &&
              (!isFollowing ? (
                isFollowing !== undefined && (
                  <Button
                    sx={followButton}
                    onClick={() => {
                      onFollow({ followingId: profile.id });
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
                  }}
                >
                  <CheckIcon />
                  <Typography className="title">팔로잉</Typography>
                </Button>
              ))}
            <Grid item alignSelf="flex-start">
              <Typography css={introduce}>
                {profile.profile.introduce}
              </Typography>
            </Grid>
            <Grid item container css={department}>
              <DepartmentIcon />
              <Typography sx={{ marginLeft: '8px', fontSize: '14px' }}>
                {profile.profile.department}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container css={leftProfileMiddle}>
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
            <Grid item container mt={4} mb={6}>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography css={followLabel}>팔로워</Typography>
                <Button
                  sx={orangeSmallLabel}
                  onClick={() => openModal('followers')}
                >
                  {profile.followers.length}
                </Button>
              </Grid>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography css={followLabel}>팔로잉</Typography>
                <Button
                  sx={orangeSmallLabel}
                  onClick={() => openModal('followings')}
                >
                  {profile.followings.length}
                </Button>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Button sx={orangeLabel} onClick={() => openModal('reviews')}>
                  긍정 리뷰
                </Button>
                <Typography css={reviewNum}>123</Typography>
              </Grid>
              {reviews.map((review, i) => (
                <Typography key={i} css={reviewText}>
                  {review}
                </Typography>
              ))}
            </Grid>
          </Grid>
          {isMe && (
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <Button sx={editProfileButton}>
                <EditProfileIcon />
                <Typography
                  sx={{
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

        <Grid item container xs={9} css={rightProfile}>
          <Grid item container xs={12} height="fit-content" mb={5}>
            <Grid item mb={1}>
              <Button sx={orangeLabel}>모아 보기</Button>
            </Grid>
            <Grid item container columns={4} spacing={2}>
              {rightInfosA.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  아직 등록된 글이 없습니다.
                </Grid>
              ) : (
                rightInfosA.map((info, i) => (
                  <Grid key={i} item xs={1} css={archiveCell}>
                    <Grid
                      css={archiveCard}
                      sx={{
                        backgroundColor: getRandomColor(info.title),
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.510208) 75.52%, rgba(0, 0, 0, 0.79) 100%), url(${info.imgUrl})`,
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '12.5px',
                        }}
                      >
                        <Typography
                          className="archiveTitle"
                          gutterBottom
                          component="div"
                          sx={archiveTitle}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '8px',
                            width: 'fit-content',
                            alignSelf: 'flex-end',
                          }}
                        >
                          {info.date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          <Grid item container xs={12} height="fit-content" mb={5}>
            <Grid item mb={4}>
              <Button sx={orangeLabel}>오픈 채널</Button>
            </Grid>
            <Grid item container columns={4}>
              {rightInfosB.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  오픈된 채널이 없습니다.
                </Grid>
              ) : (
                rightInfosB.map((info, i) => (
                  <Grid key={i} item xs={1} css={channelCell}>
                    <Grid css={channelCard}>
                      <Box
                        sx={{
                          backgroundImage: `url(${info.imgUrl})`,
                          backgroundColor: getRandomColor(info.name),
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '125px',
                          height: '125px',
                          borderRadius: '50%',
                          ':hover': {
                            backgroundImage: info.imgUrl
                              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%), url(${info.imgUrl})`
                              : 'linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%)',
                          },
                        }}
                      ></Box>
                      <Typography sx={channelName}>{info.name}</Typography>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          <Grid item container xs={12} height="fit-content" mb={5}>
            <Grid item mb={4}>
              <Button sx={orangeLabel}>참여 채널</Button>
            </Grid>
            <Grid item container columns={4}>
              {rightInfosC.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  참여하는 채널이 없습니다.
                </Grid>
              ) : (
                rightInfosC.map((info, i) => (
                  <Grid key={i} item xs={1} css={channelCell}>
                    <Grid css={channelCard}>
                      <Box
                        sx={{
                          backgroundImage: `url(${info.imgUrl})`,
                          backgroundColor: getRandomColor(info.name),
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: '125px',
                          height: '125px',
                          borderRadius: '50%',
                          ':hover': {
                            backgroundImage: info.imgUrl
                              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%), url(${info.imgUrl})`
                              : 'linear-gradient(0deg, rgba(0, 0, 0, 0.3) 23.2%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.06) 100%)',
                          },
                        }}
                      ></Box>
                      <Typography sx={channelName}>{info.name}</Typography>
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
  margin-top: 4.0625rem;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
`;

const widthContainer = css`
  margin-top: 30px;
  max-width: 960px;
`;

const leftProfile = css`
  background-color: #fff;
  height: fit-content;
  border: 2px;
  border-radius: 5px;
  padding: 10px;
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
  padding: 10px 5px;
  margin-bottom: 36px;
`;

const avatar = css`
  width: 120px;
  height: 120px;
  margin: 20px auto 10px auto;
`;

const nickname = css`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const followButton = css`
  background-color: #ff511b;
  color: white;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 40px;
  padding: 0 8px;
  margin: 5px 0;

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-left: 6px;
  }

  &:hover {
    border: none;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      linear-gradient(0deg, #ff511b, #ff511b);
  }
`;

const followingButton = css`
  color: #ff511b;
  width: 180px;
  height: 40px;
  border-color: #ff511b;
  border-radius: 40px;
  padding: 0 8px;
  margin: 5px 0;

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-left: 6px;
  }

  &:hover {
    border-color: #ff511b;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));
  }
`;

const introduce = css`
  justify-self: flex-start;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const department = css`
  display: flex;
  align-items: center;
`;

const leftProfileMiddle = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 5px;
  margin-bottom: 14px;
`;

const talentLabel = css`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const talentTags = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  margin-bottom: 30px;
`;

const talentTag = css`
  border-radius: 14px;
  background-color: #7b7b7b;
  color: ${palette.white};
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
`;

const followLabel = css`
  font-size: 16px;
`;

const orangeLabel = css`
  background-color: #fff;
  color: black;
  font-size: 16px;
  font-weight: 700;
  height: 32px;
  border: 1px solid gray;
  border-radius: 32px;
  padding: 0 8px;
  margin: 4px 0;
  &:hover {
    border-color: #ff511b;
    background-color: #ff511b;
    color: white;
  }
`;
const orangeSmallLabel = css`
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
  font-size: 16px;
`;

const reviewText = css`
  font-size: 12px;
  margin: 5px;
`;

const editProfileButton = css`
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
  padding-left: 50px;
`;

const archiveCell = css`
  width: 165px;
  height: 240px;
`;

const archiveCard = css`
  cursor: pointer;
  border-radius: 5px;
  height: 100%;
  color: white;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  &:not(:hover) .archiveTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const archiveTitle = css`
  transition: all ease 0.2s;
  font-size: 12px;
  font-weight: 700;
  width: 124px;
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
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
  word-break: keep-all;
`;

const noTags = css`
  font-size: 12px;
  color: #5f5f5f;
  text-align: center;
  margin: 10px auto 30px auto;
`;

const noContents = css`
  font-size: 14px;
  color: #5f5f5f;
  text-align: center;
  height: 200px;
  line-height: 200px;
`;

export default Profile;
