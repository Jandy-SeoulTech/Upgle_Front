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

const Profile = ({ errorMessage }) => {
  const { id } = useParams();
  const m1200 = useMediaQuery('(max-width: 1199px)');

  const wellTalent = ['팝핀', '방송 댄스', '못질'];
  const interestTalent = ['스페인어', '베이킹', '달리기'];
  const reviews = [
    '팝핀 정말 잘춰요~기본기를 정말 탄탄하게 알려줘서 처음 배우는 사람도 재미있게 배울 수 있어요! 댄싱퀸펭귄님 최고!',
    '진짜 너무 친절하세요~제가 못질은 처음이라서 질문을 계속 물어봐서 귀찮을만도 한데 하나하나 알려주서 잘 배울 수 있었어요. 못질 기본기 없으신 분들은 펭귄님 채널 추천!!!',
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
        <Grid item container xs={9} css={rightProfile} justifyContent="center">
          <Typography>Channel</Typography>
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
  font-weight: 600;
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
  height: 800px;
`;

export default Profile;
