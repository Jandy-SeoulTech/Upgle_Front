import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signin from '../../components/auth/Signin';
import { signin, initAuth } from '../../modules/auth';
import { check } from '../../modules/user';

const SigninContainer = ({ OAuthComponent }) => {
  const { auth, signinError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async ({ email, password }) => {
    await dispatch(signin({ email, password }));
    dispatch(check());
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  return <Signin onLogin={onLogin} errorMessage={signinError} OAuthComponent={OAuthComponent} />;
};

export default SigninContainer;
