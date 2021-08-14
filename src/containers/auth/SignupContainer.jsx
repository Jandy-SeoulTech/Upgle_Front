import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Signup from '../../components/auth/Signup';
import {
  checkEmail,
  checkNickname,
  checkVerificationCode,
  emailChanged,
  googleOauth,
  initAuth,
  kakaoOauth,
  naverOauth,
  nicknameChanged,
  sendVerificationCode,
  signup,
} from '../../modules/auth';

const SignupContainer = (props) => {
  const {
    auth,
    emailChecked,
    codeSent,
    codeVerified,
    nicknameChecked,
    signedUp,
    error,
  } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
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

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl:
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL
          : process.env.REACT_APP_NAVER_LOGIN_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' },
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    onNaverOauth(token);
  };

  const onCheckEmail = ({ email }) => {
    dispatch(checkEmail({ email }));
  };

  const onEmailChanged = () => {
    dispatch(emailChanged());
  };

  const onSendCode = ({ email }) => {
    dispatch(sendVerificationCode({ email }));
  };

  const onCheckCode = ({ email, code }) => {
    dispatch(checkVerificationCode({ email, code }));
  };

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  const onNicknameChanged = () => {
    dispatch(nicknameChanged());
  };

  const onSignup = ({ email, password, nickname }) => {
    dispatch(signup({ email, password, nickname }));
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
      setErrorMessage('이미 가입된 회원입니다.');
    }
  }, [error]);

  useEffect(() => {
    if (signedUp) {
      alert('가입이 완료되었습니다!\n로그인 해주세요.');
      history.push('/signin');
    }
  }, [signedUp, history]);

  useEffect(() => {
    if (auth) {
      alert('이미 가입한 계정이 있습니다.');
      history.push('/signin');
    }
  }, [auth, history]);

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
    <Signup
      onSignup={onSignup}
      onCheckEmail={onCheckEmail}
      onSendCode={onSendCode}
      onCheckCode={onCheckCode}
      onCheckNickname={onCheckNickname}
      emailChecked={emailChecked}
      codeSent={codeSent}
      codeVerified={codeVerified}
      nicknameChecked={nicknameChecked}
      onEmailChanged={onEmailChanged}
      onNicknameChanged={onNicknameChanged}
      onKakaoOauth={onKakaoOauth}
      onGoogleOauth={onGoogleOauth}
      errorMessage={errorMessage}
    />
  );
};

export default SignupContainer;
