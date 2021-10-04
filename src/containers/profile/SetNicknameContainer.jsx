import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SetNickname from '../../components/profile/SetNickname';
import { checkNickname, nicknameChanged, setNickname } from '../../modules/auth';
import { check } from '../../modules/user';

const SetNicknameContainer = (props) => {
  const { nicknameChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  const onNicknameChanged = () => {
    dispatch(nicknameChanged());
  };

  const onSetNickname = async ({ nickname }) => {
    await dispatch(setNickname({ nickname }));
    await dispatch(check());
    history.push('/');
  };

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
