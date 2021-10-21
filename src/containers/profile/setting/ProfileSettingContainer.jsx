import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initImage, setProfileImage, uploadProfileImage } from '../../../modules/image';
import { check } from '../../../modules/user';
import { updateProfile } from '../../../modules/write';
import { checkNickname, initAuth } from '../../../modules/auth';
import ProfileSetting from '../../../components/profile/setting/ProfileSetting';
import { changePassword, checkPassword } from '../../../modules/profile';

const ProfileSettingContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { auth, nicknameChecked } = useSelector((state) => state.auth);
  const { updatedProfile } = useSelector((state) => state.write);
  const { profileImage } = useSelector((state) => state.image);
  const { checkedPassword, changedPassword } = useSelector((state) => state.profile);

  const onChangePassword = ({ password }) => {
    dispatch(changePassword({ password }));
  };

  const onCheckPassword = ({ password }) => {
    dispatch(checkPassword({ password }));
  };

  const onUpdateProfile = ({ nickname, department, introduce, wellTalent, interestTalent }) => {
    dispatch(
      updateProfile({
        userId: user.id,
        nickname,
        department,
        introduce,
        wellTalent,
        interestTalent,
        src: profileImage,
      }),
    );
  };

  const onUploadProfileImage = (formData) => {
    dispatch(uploadProfileImage(formData));
  };

  const onInitImage = () => {
    dispatch(initImage());
  };

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  useEffect(() => {
    if (user?.profile?.profileImage) {
      dispatch(setProfileImage(user.profile.profileImage));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(initImage());
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
  }, [auth, dispatch]);

  return (
    <ProfileSetting
      user={user}
      profileImage={profileImage}
      onUploadProfileImage={onUploadProfileImage}
      onInitImage={onInitImage}
      onCheckNickname={onCheckNickname}
      nicknameDuplicateError={!nicknameChecked}
      onUpdateProfile={onUpdateProfile}
      onChangePassword={onChangePassword}
      onCheckPassword={onCheckPassword}
      updatedProfile={updatedProfile}
      checkedPassword={checkedPassword}
      changedPassword={changedPassword}
    />
  );
};

export default ProfileSettingContainer;
