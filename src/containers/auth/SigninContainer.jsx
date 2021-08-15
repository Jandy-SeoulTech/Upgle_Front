import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Signin from '../../components/auth/Signin';
import {
  signin,
  initAuth,
  kakaoOauth,
  googleOauth,
  naverOauth,
} from '../../modules/auth';
import { check } from '../../modules/user';

const SigninContainer = (props) => {
  const { auth, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { naver } = window;
  const location = useLocation();

  const onLogin = ({ email, password }) => {
    dispatch(signin({ email, password }));
  };

  const onKakaoOauth = (access_token) => {
    dispatch(kakaoOauth(access_token));
  };

  const onGoogleOauth = (access_token) => {
    dispatch(googleOauth(access_token));
  };

  const onNaverOauth = (access_token) => {
    dispatch(naverOauth(access_token));
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/signin',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    onNaverOauth(token);
    console.log(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
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
          history.push('/');
        }
      }
    }
  }, [user, history]);

  return (
    <Signin
      onLogin={onLogin}
      errorMessage={errorMessage}
      onKakaoOauth={onKakaoOauth}
      onGoogleOauth={onGoogleOauth}
    />
  );
};

export default SigninContainer;
