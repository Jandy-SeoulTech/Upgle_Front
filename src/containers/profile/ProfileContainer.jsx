import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Profile from '../../components/profile/Profile';
import { getProfile, initProfile } from '../../modules/profile';
import { check } from '../../modules/user';

const ProfileContainer = () => {
  const { auth, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.profile);
  const getProfileLoading = useSelector(
    (state) => state.loading['profile/GET_PROFILE'],
  );

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getProfile({ userId }));
    return () => {
      dispatch(initProfile());
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
  }, [auth, error, dispatch]);

  useEffect(() => {
    if (user && profile) {
      console.log(user.id);
      console.log(profile.id);
    } else {
      console.log('로그인 유저 없음');
    }
  }, [user, profile]);

  return (
    <Profile
      getProfileLoading={getProfileLoading}
      me={Boolean(user?.id === profile?.id)}
      user={user}
      profile={profile}
      errorMessage={errorMessage}
    />
  );
};

export default ProfileContainer;
