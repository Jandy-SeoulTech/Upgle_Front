import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Profile from '../../components/profile/Profile';
import { getMychannel } from '../../modules/channel';
import {
  getFollowers,
  getFollowings,
  getProfile,
  initProfile,
  profileFollow,
  profileUnfollow,
} from '../../modules/profile';
import { check, follow, unfollow } from '../../modules/user';

const ProfileContainer = () => {
  const { auth, error: authError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    profile,
    followers,
    followings,
    error: profileError,
  } = useSelector((state) => state.profile);
  const { myChannel } = useSelector((state) => state.channel);
  const getProfileLoading = useSelector(
    (state) => state.loading['profile/GET_PROFILE'],
  );
  const getFollowersLoading = useSelector(
    (state) => state.loading['profile/GET_FOLLOWERS'],
  );
  const getFollowingsLoading = useSelector(
    (state) => state.loading['profile/GET_FOLLOWINGS'],
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

  const onProfileFollow = ({ followingId, isMe }) => {
    dispatch(profileFollow({ followingId, isMe }));
  };

  const onProfileUnfollow = ({ followingId, isMe }) => {
    dispatch(profileUnfollow({ followingId, isMe }));
  };

  const onGetFollowers = () => {
    dispatch(getFollowers({ userId }));
  };

  const onGetFollowings = () => {
    dispatch(getFollowings({ userId }));
  };

  useEffect(() => {
    dispatch(getProfile({ userId }));
    dispatch(getMychannel());
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
      getFollowersLoading={getFollowersLoading}
      getFollowingsLoading={getFollowingsLoading}
      isMe={isMe}
      isFollowing={isFollowing}
      user={user}
      profile={profile}
      followers={followers}
      followings={followings}
      myChannel={myChannel}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      onProfileFollow={onProfileFollow}
      onProfileUnfollow={onProfileUnfollow}
      onGetFollowers={onGetFollowers}
      onGetFollowings={onGetFollowings}
      errorMessage={errorMessage}
    />
  );
};

export default ProfileContainer;
