import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../modules/user';
import { useHistory } from 'react-router';

const CheckLogin = ({ Component, match }) => {
  const { user, checkError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  useEffect(() => {
    if (checkError) {
      alert('로그인해주세요');
      history.push('/signin');
    }
  }, [checkError]);

  if (!user) return null;

  return <Component match={match} />;
};

export default CheckLogin;
