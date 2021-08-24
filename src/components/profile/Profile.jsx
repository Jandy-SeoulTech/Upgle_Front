/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { ReactComponent as DepartmentIcon } from '../../lib/assets/departmentIcon.svg';
import { ReactComponent as EditProfileIcon } from '../../lib/assets/editProfileIcon.svg';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const randomColor = (title) => {
  const colors = [
    '#FFFFFF',
    '#FFB49D',
    '#FFAAB4',
    '#FF9898',
    '#87EEC3',
    '#B9EEFF',
    '#9CC4FF',
    '#BEC7FF',
  ];
  return colors[title.length % colors.length];
};

const Profile = ({ errorMessage }) => {
  const { id } = useParams();
  const m1200 = useMediaQuery('(max-width: 1199px)');

  const wellTalent = ['팝핀', '방송 댄스', '못질'];
  const interestTalent = ['스페인어', '베이킹', '달리기'];
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
        '홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 홈페이지를 만들 때 사용할 수 있는 여러 무료 이미지 ...',
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

  return (
    <Grid container css={wrapper}>
      <Grid item container xs={12} css={widthContainer}>
        <Grid item container xs={3} css={leftProfile}>
          <Grid item container css={leftProfileTop}>
            <Grid item>
              <Avatar css={avatar} />
            </Grid>
            <Grid item>
              <Typography css={nickname}>nickname</Typography>
            </Grid>
            <Grid item>
              <Typography css={introduce}>
                안녕하세요. 저는 춤추는 것을 좋아합니다. 다양한 재능을 배우고
                싶어요
              </Typography>
            </Grid>
            <Grid item container css={department}>
              <DepartmentIcon />
              <Typography sx={{ marginLeft: '8px', fontSize: '14px' }}>
                과기대 컴공
              </Typography>
            </Grid>
          </Grid>
          <Grid item container css={leftProfileMiddle}>
            <Grid item container px={1}>
              <Typography css={talentLabel}>잘하는 재능</Typography>
              <Grid item css={talentTags}>
                {wellTalent.map((talent) => (
                  <Typography css={talentTag}>{talent}</Typography>
                ))}
              </Grid>
            </Grid>
            <Grid item container px={1}>
              <Typography css={talentLabel}>관심있는 재능</Typography>
              <Grid item css={talentTags}>
                {interestTalent.map((talent) => (
                  <Typography css={talentTag}>{talent}</Typography>
                ))}
              </Grid>
            </Grid>
            <Grid item container mb={3}>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography css={followLabel}>팔로워</Typography>
                <Typography css={followNum}>12</Typography>
              </Grid>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography css={followLabel}>팔로잉</Typography>
                <Typography css={followNum}>123</Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography css={reviewLabel}>긍정 리뷰</Typography>
                <Typography css={reviewNum}>123</Typography>
              </Grid>
              {reviews.map((review) => (
                <Typography css={reviewText}>{review}</Typography>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Button css={editProfileButton}>
              <EditProfileIcon />
              <Typography
                sx={{ marginLeft: '8px', fontSize: '20px', fontWeight: '600' }}
              >
                프로필 수정
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={9} css={rightProfile}>
          <Grid item container xs={12} height="fit-content" mb={5}>
            <Grid item mb={1}>
              <Typography css={reviewLabel}>모아 보기</Typography>
            </Grid>
            <Grid item container columns={{ xs: 4 }} spacing={2}>
              {rightInfosA.length === 0 ? (
                <Grid item xs={1} css={archiveCell}>
                  <Grid
                    css={archiveCard}
                    sx={{
                      backgroundColor: 'white',
                      backgroundImage:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 75.52%, rgba(0, 0, 0, 0.4) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <AddCircleOutlineIcon width="36px" />
                    <Typography fontSize="14px" color="black" mt={1}>
                      아카이브를 남겨보세요.
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                rightInfosA.map((info) => (
                  <Grid item xs={1} css={archiveCell}>
                    <Grid
                      css={archiveCard}
                      sx={{
                        backgroundColor: randomColor(info.title),
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.510208) 75.52%, rgba(0, 0, 0, 0.79) 100%), url(${info.imgUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        display: 'flex',
                        alignItems: 'flex-end',
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
              <Typography css={reviewLabel}>오픈 채널</Typography>
            </Grid>
            <Grid item container columns={{ xs: 4 }} columnGap={6}>
              {rightInfosB.length === 0 ? (
                <Grid
                  item
                  xs={1}
                  sx={{
                    backgroundColor: '#C4C4C4',
                    borderRadius: '50%',
                    height: '125px',
                    width: '125px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AddCircleOutlineIcon fontSize="large" />
                </Grid>
              ) : (
                rightInfosB.map((info) => (
                  <Grid item xs={1} css={openChannelCell}>
                    <Grid css={openChannelCard}>
                      <Avatar
                        alt={info.name}
                        src={info.imgUrl ? info.imgUrl : 'none'}
                        sx={{
                          backgroundColor: randomColor(info.name),
                          width: '100%',
                          height: '125px',
                        }}
                      />
                      <Typography sx={openChannelName}>{info.name}</Typography>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          <Grid item container xs={12} height="fit-content" mb={5}>
            <Grid item mb={4}>
              <Typography css={reviewLabel}>참여 채널</Typography>
            </Grid>
            <Grid item container columns={{ xs: 4 }} columnGap={6}>
              {rightInfosC.length === 0 ? (
                <Grid
                  item
                  xs={1}
                  sx={{
                    backgroundColor: '#C4C4C4',
                    borderRadius: '50%',
                    height: '125px',
                    width: '125px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AddCircleOutlineIcon fontSize="large" />
                </Grid>
              ) : (
                rightInfosC.map((info) => (
                  <Grid item xs={1} css={openChannelCell}>
                    <Grid css={openChannelCard}>
                      <Avatar
                        alt={info.name}
                        src={info.imgUrl ? info.imgUrl : 'none'}
                        sx={{
                          backgroundColor: randomColor(info.name),
                          width: '100%',
                          height: '125px',
                        }}
                      />
                      <Typography sx={openChannelName}>{info.name}</Typography>
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
`;

const avatar = css`
  width: 120px;
  height: 120px;
  margin: 20px auto 10px auto;
`;

const nickname = css`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 14px;
`;

const introduce = css`
  font-size: 14px;
  margin-bottom: 8px;
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
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const talentTags = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
  margin-bottom: 24px;
`;

const talentTag = css`
  border-radius: 14px;
  background-color: ${palette.gray};
  color: ${palette.white};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
`;

const followLabel = css`
  font-size: 14px;
  font-weight: 600;
`;

const followNum = css`
  font-size: 12px;
  height: fit-content;
  border: 1px solid ${palette.gray};
  border-radius: 24px;
  padding: 0 8px;
  margin: 4px 0;
`;

const reviewLabel = css`
  font-size: 14px;
  height: fit-content;
  border: 1px solid gray;
  border-radius: 24px;
  padding: 0 8px;
  margin: 4px 0;
  font-weight: 700;
`;

const reviewNum = css`
  font-size: 14px;
`;

const reviewText = css`
  font-size: 12px;
  margin: 5px;
`;

const editProfileButton = css`
  color: ${palette.black};
  width: 95%;
  height: 42px;
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
  border-radius: 5px;
  height: 100%;
  color: white;
`;

const archiveTitle = css`
  font-size: 12px;
  font-weight: 700;
  height: 36px;
  width: 124px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
  height: 2.4rem;
`;

const openChannelCell = css`
  width: 125px;
  height: 170px;
`;

const openChannelCard = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const openChannelName = css`
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
  word-break: keep-all;
`;

export default Profile;
