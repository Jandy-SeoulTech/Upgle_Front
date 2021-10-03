import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signup from '../../components/auth/Signup';
import {
  checkEmail,
  checkNickname,
  checkVerificationCode,
  emailChanged,
  initAuth,
  nicknameChanged,
  sendVerificationCode,
  signup,
} from '../../modules/auth';
import { check } from '../../modules/user';

const SignupContainer = ({ OAuthComponent }) => {
  const { auth, emailChecked, codeSent, codeVerified, nicknameChecked, error } = useSelector(
    (state) => state.auth,
  );
  const { user } = useSelector((state) => state.user);
  const { pending } = useSelector((state) => state.pender);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch(checkVerificationCode({ email, auth: code }));
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
    if (auth) {
      dispatch(check());
    }
  }, [auth, error, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
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
      errorMessage={errorMessage}
      emailSendLoading={pending['auth/SEND_VERIFICATION_CODE']}
      OAuthComponent={OAuthComponent}
    />
  );
};

export default SignupContainer;
