import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SetNickname from '../../components/auth/SetNickname';
import {
  checkNickname,
  initAuth,
  nicknameChanged,
  setNickname,
} from '../../modules/auth';
import { setNicknameState } from '../../modules/user';

const SetNicknameContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { nicknameChecked, setNicknameSuccess } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  const onNicknameChanged = () => {
    dispatch(nicknameChanged());
  };

  const onSetNickname = ({ nickname }) => {
    dispatch(setNickname({ nickname }));
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!!setNicknameSuccess) {
      dispatch(setNicknameState({ nickname: setNicknameSuccess }));
      history.push('/');
    }
  }, [setNicknameSuccess, history, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        alert('관리자님 환영합니다!');
        history.push('/admin');
      } else {
        if (!user.nickname) {
          alert('가입이 완료되었습니다!\n닉네임을 등록해주세요.');
        } else {
          alert(`${user.nickname}님 안녕하세요!`);
          history.push('/');
        }
      }
    }
  }, [user, history]);

  return (
    <SetNickname
      onCheckNickname={onCheckNickname}
      onNicknameChanged={onNicknameChanged}
      onSetNickname={onSetNickname}
      nicknameChecked={nicknameChecked}
    />
  );
};

export default SetNicknameContainer;
