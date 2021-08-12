import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signin from '../../components/auth/Signin';
import { signin, initAuth, oauthKakao } from '../../modules/auth';
import { check } from '../../modules/user';

const SigninContainer = (props) => {
  const { auth, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { Kakao } = window;

  const onLogin = ({ email, password }) => {
    dispatch(signin({ email, password }));
  };

  const onKakaoOauth = () => {
    Kakao.Auth.login({
      success: (response) => {
        dispatch(oauthKakao(response.access_token));
        console.log(response);
        alert('로그인 되었습니다.');
      },
      fail: (error) => {
        alert(JSON.stringify(error));
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage('아이디와 패스워드를 다시 입력해주세요');
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
        alert(`${user.nickname}님 안녕하세요!`);
        history.push('/');
      }
    }
  }, [user, history]);

  return (
    <Signin
      onLogin={onLogin}
      errorMessage={errorMessage}
      onKakaoOauth={onKakaoOauth}
    />
  );
};

export default SigninContainer;
