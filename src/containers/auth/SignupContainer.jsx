import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signup from '../../components/auth/Signup';
import {
  checkEmail,
  checkNickname,
  checkVerificationCode,
  initAuth,
  nicknameChanged,
  sendVerificationCode,
  signup,
} from '../../modules/auth';

const SignupContainer = (props) => {
  const {
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

  const onCheckEmail = ({ email }) => {
    dispatch(checkEmail({ email }));
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
      onNicknameChanged={onNicknameChanged}
      errorMessage={errorMessage}
    />
  );
};

export default SignupContainer;
