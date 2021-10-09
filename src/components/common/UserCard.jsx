/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from 'react';
import Button from './Button';

function UserCard({ loggedInUser, user, onFollow, onUnfollow }) {
  const [isMe, setIsMe] = useState();
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    if (loggedInUser && user) {
      setIsMe(Boolean(loggedInUser?.id === user?.id));
      setIsFollowing(
        Boolean(loggedInUser?.followings?.map((el) => el.followingId).includes(user?.id)),
      );
    }
  }, [loggedInUser, user]);

  return (
    <Grid container py={4} border="1px solid #E0E0E0" borderRadius="0.625rem">
      <Grid item container xs={2}>
        <Avatar
          css={avatar}
          src={user?.profile?.profileImage.src}
          onClick={() => (window.location.href = `/profile/${user.id}`)}
        />
      </Grid>
      <Grid item container xs={8} alignContent="center" rowGap={0.5}>
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
      <Grid item container xs={2}>
        {!isMe &&
          (!isFollowing ? (
            isFollowing !== undefined && (
              <Button
                sx={followButton}
                onClick={() => {
                  setIsFollowing(true);
                  onFollow({ followingId: user.id });
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
                setIsFollowing(false);
                onUnfollow({ followingId: user.id });
              }}
            >
              <CheckIcon />
              <Typography className="title">팔로잉</Typography>
            </Button>
          ))}
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

const followButton = css`
  background-color: #ff511b;
  color: white;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 30px;
  padding: 0 8px;
  margin: auto;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
    font-size: 16px;
    font-weight: 700;
    margin-left: 6px;
  }

  &:hover {
    border: none;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), #ff511b;
  }
`;

const followingButton = css`
  color: #ff511b;
  width: 100px;
  height: 30px;
  border-color: #ff511b;
  border-radius: 30px;
  padding: 0 8px;
  margin: auto;

  .title {
    font-family: 'Noto Sans KR', 'sans-serif' !important;
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

export default UserCard;
