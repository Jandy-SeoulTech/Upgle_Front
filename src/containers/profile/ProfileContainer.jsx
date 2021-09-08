import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Profile from '../../components/profile/Profile';
import { getChannelList } from '../../modules/channel';
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
  const { profile, followers, followings } = useSelector(
    (state) => state.profile,
  );
  const { profileChannel } = useSelector((state) => state.channel);
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
    dispatch(getChannelList({ userId }));
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
      profileChannel={profileChannel}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      onProfileFollow={onProfileFollow}
      onProfileUnfollow={onProfileUnfollow}
      onGetFollowers={onGetFollowers}
      onGetFollowings={onGetFollowings}
    />
  );
};

export default ProfileContainer;
