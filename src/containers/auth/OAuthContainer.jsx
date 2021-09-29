import React, { useEffect } from 'react';
import { kakaoOauth, googleOauth, naverOauth } from '../../modules/auth';
import OAuth from '../../components/auth/OAuth';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const OAuthContainer = (props) => {
  const dispatch = useDispatch();
  const { naver } = window;
  const location = useLocation();

  const onKakaoOauth = (access_token) => {
    dispatch(kakaoOauth(access_token));
  };

  const onGoogleOauth = (access_token) => {
    dispatch(googleOauth(access_token));
  };

  const onNaverOauth = (access_token) => {
    dispatch(naverOauth(access_token));
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    onNaverOauth(token);
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/signin',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();
  };

  return <OAuth onKakaoOauth={onKakaoOauth} onGoogleOauth={onGoogleOauth} />;
};

export default OAuthContainer;
