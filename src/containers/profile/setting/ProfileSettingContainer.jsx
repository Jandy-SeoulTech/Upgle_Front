import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { initialize, uploadImages } from '../../../modules/image';
import { check } from '../../../modules/user';
import { updateProfile } from '../../../modules/write';
import { checkNickname, initAuth } from '../../../modules/auth';
import ProfileSetting from '../../../components/profile/setting/ProfileSetting';
import { changePassword, checkPassword } from '../../../modules/profile';

const ProfileSettingContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { auth, nicknameChecked } = useSelector((state) => state.auth);
  const { profile, error } = useSelector((state) => state.write);
  const { images } = useSelector((state) => state.image);
  const { checkedPassword, changedPassword } = useSelector(
    (state) => state.profile,
  );

  const onChangePassword = ({ password }) => {
    dispatch(changePassword({ password }));
  };

  const onCheckPassword = ({ password }) => {
    dispatch(checkPassword({ password }));
  };

  const onUpdateProfile = ({
    nickname,
    department,
    introduce,
    wellTalent,
    interestTalent,
    src,
  }) => {
    dispatch(
      updateProfile({
        userId: user.id,
        nickname,
        department,
        introduce,
        wellTalent,
        interestTalent,
        src: images[0] || null,
      }),
    );
  };

  const uploadImage = (formData) => {
    dispatch(uploadImages(formData));
  };

  const initializeImage = () => {
    dispatch(initialize());
  };

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  useEffect(() => {
    if (profile) {
      alert('프로필이 수정되었습니다.');
    }
    if (changedPassword) {
      alert('비밀번호가 수정되었습니다.');
    }
    if (error) {
      alert('프로필 수정에 실패했습니다.');
    }
  }, [profile, changedPassword, error]);

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user, history]);

  return (
    <ProfileSetting
      user={user}
      images={images}
      uploadImage={uploadImage}
      initializeImage={initializeImage}
      onCheckNickname={onCheckNickname}
      nicknameDuplicateError={!nicknameChecked}
      onUpdateProfile={onUpdateProfile}
      onChangePassword={onChangePassword}
      onCheckPassword={onCheckPassword}
      checkedPassword={checkedPassword}
      changedPassword={changedPassword}
    />
  );
};

export default ProfileSettingContainer;
