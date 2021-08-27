import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Profile from '../../components/profile/Profile';
import {
  follow,
  getProfile,
  initProfile,
  unfollow,
} from '../../modules/profile';
import { check } from '../../modules/user';

const ProfileContainer = () => {
  const { auth, error: authError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { profile, error: profileError } = useSelector(
    (state) => state.profile,
  );
  const getProfileLoading = useSelector(
    (state) => state.loading['profile/GET_PROFILE'],
  );

  const [isMe, setIsMe] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { userId } = useParams();

  const onFollow = ({ followingId }) => {
    dispatch(follow({ followingId }));
  };

  const onUnfollow = ({ followingId }) => {
    dispatch(unfollow({ followingId }));
  };

  useEffect(() => {
    dispatch(getProfile({ userId }));
    return () => {
      dispatch(initProfile());
    };
  }, [userId, dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user && profile) {
      setIsMe(Boolean(user?.id === profile?.id));
      setIsFollowing(
        Boolean(
          profile?.followers.map((el) => el.followerId).includes(user?.id),
        ),
      );
    } else {
      console.log('로그인 유저 없음');
    }
  }, [user, profile]);

  return (
    <Profile
      getProfileLoading={getProfileLoading}
      isMe={isMe}
      isFollowing={isFollowing}
      user={user}
      profile={profile}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      errorMessage={errorMessage}
    />
  );
};

export default ProfileContainer;
