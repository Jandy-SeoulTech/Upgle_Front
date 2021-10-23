/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import Button from './Button';

function AdminModalUserCard({ user, onBanUser, onPassAdmin, setIsAdminModalOpen }) {
  return (
    <Grid container py={4} borderTop=".5px solid #E0E0E0" borderBottom=".5px solid #E0E0E0">
      <Grid item container xs={2}>
        <Avatar
          css={avatar}
          src={user?.profile?.profileImage}
          onClick={() => (window.location.href = `/profile/${user.id}`)}
        />
      </Grid>
      <Grid item container xs={5} alignContent="center" rowGap={0.5}>
        <Grid item xs={12}>
          <Typography css={nickname} onClick={() => (window.location.href = `/profile/${user.id}`)}>
            {user.nickname}
          </Typography>
        </Grid>
        <Grid item xs={12} css={talentTags}>
          {user?.profile?.wellTalent.map((talent, i) => (
            <Typography key={i} css={talentTag}>
              {talent.contents}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Grid item container xs={5} css={buttons}>
        <Button
          sx={banUserButton}
          onClick={() => {
            onBanUser({ userId: user.id, username: user.nickname });
            setIsAdminModalOpen(false);
          }}
        >
          <Typography className="title">내보내기</Typography>
        </Button>
        <Button
          sx={passAdminButton}
          onClick={() => {
            onPassAdmin({ userId: user.id, username: user.nickname });
            setIsAdminModalOpen(false);
          }}
        >
          <Typography className="title">권한 넘겨주기</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

const avatar = css`
  cursor: pointer;
  width: 75px;
  height: 75px;
  margin: auto;
`;

const nickname = css`
  font-family: 'Barlow', 'Noto Sans KR', 'sans-serif' !important;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
`;

const talentTags = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;

const talentTag = css`
  font-family: 'Barlow', 'Noto Sans KR', 'sans-serif' !important;
  border-radius: 14px;
  background-color: #7b7b7b;
  color: white;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
`;

const buttons = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1.875rem;
  padding-right: 3.125rem;
`;

const banUserButton = css`
  background-color: black;
  color: white;
  width: 7.5rem;
  height: 2rem;
  border: none;
  border-radius: 2rem;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
    font-size: 1rem;
    font-weight: 700;
  }

  &:hover {
    border: none;
    background: #000000cc;
  }
`;

const passAdminButton = css`
  background-color: #ff0000;
  color: white;
  width: 7.5rem;
  height: 2rem;
  border: none;
  border-radius: 2rem;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
    font-size: 1rem;
    font-weight: 700;
  }

  &:hover {
    border: none;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(0deg, #ff0000, #ff0000);
  }
`;

export default AdminModalUserCard;
