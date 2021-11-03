import React, { useEffect } from 'react';
import { kakaoOauth, googleOauth, naverOauth, setSigninError } from '../../modules/auth';
import OAuth from '../../components/auth/OAuth';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const OAuthContainer = (props) => {
  const dispatch = useDispatch();
  const { naver } = window;
  const location = useLocation();

  const onOauth = async ({ mode, access_token }) => {
    switch (mode) {
      case 'kakao': {
        return await dispatch(kakaoOauth(access_token));
      }
      case 'google': {
        return await dispatch(googleOauth(access_token));
      }
      case 'naver': {
        return await dispatch(naverOauth(access_token));
      }
      default: {
        dispatch(setSigninError('잘못된 접근입니다.'));
      }
    }
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    onOauth({ mode: 'naver', access_token: token });
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'https://upgle.hisfolio.com/signin',
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();
  };

  return <OAuth onOauth={onOauth} />;
};

export default OAuthContainer;
