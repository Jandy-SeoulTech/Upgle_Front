import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signin from '../../components/auth/Signin';
import { signin, initAuth } from '../../modules/auth';
import { check } from '../../modules/user';

const SigninContainer = ({ OAuthComponent }) => {
  const { auth, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = ({ email, password }) => {
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage('로그인에 실패했습니다');
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, error, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        alert('관리자님 환영합니다!');
        history.push('/admin');
      } else {
        if (!user.nickname) {
          history.push('/nickname');
        } else {
          alert(`${user.nickname}님 안녕하세요!`);
          if (!user.profile) {
            history.push('/uploadProfile');
          } else {
            history.push('/');
          }
        }
      }
    }
  }, [user, history]);

  return (
    <Signin
      onLogin={onLogin}
      errorMessage={errorMessage}
      OAuthComponent={OAuthComponent}
    />
  );
};

export default SigninContainer;
