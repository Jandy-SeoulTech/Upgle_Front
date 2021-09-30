import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Profile from '../../components/profile/Profile';
import {
  getFollowers,
  getFollowings,
  getProfile,
  getReviews,
  initProfile,
  profileFollow,
  profileUnfollow,
} from '../../modules/profile';
import { check, follow, unfollow } from '../../modules/user';

const ProfileContainer = () => {
  const { auth, error: authError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { profile, followers, followings, reviews } = useSelector(
    (state) => state.profile,
  );
  const { pending } = useSelector((state) => state.pender);

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

  const onGetReviews = () => {
    dispatch(getReviews({ userId }));
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
      setIsMe(Boolean(user.id === profile.id));
      setIsFollowing(Boolean(profile.followers.map((el) => el.followerId).includes(user.id)));
    }
  }, [user, profile]);

  if (!profile) return '로딩중';

  return (
    <Profile
      getProfileLoading={pending['profile/GET_PROFILE']}
      getFollowersLoading={pending['profile/GET_FOLLOWERS']}
      getFollowingsLoading={pending['profile/GET_FOLLOWINGS']}
      getReviewsLoading={pending['profile/GET_REVIEWS']}
      pending={pending}
      isMe={isMe}
      isFollowing={isFollowing}
      user={user}
      profile={profile}
      followers={followers}
      followings={followings}
      reviews={reviews}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      onProfileFollow={onProfileFollow}
      onProfileUnfollow={onProfileUnfollow}
      onGetFollowers={onGetFollowers}
      onGetFollowings={onGetFollowings}
      onGetReviews={onGetReviews}
    />
  );
};

export default ProfileContainer;
