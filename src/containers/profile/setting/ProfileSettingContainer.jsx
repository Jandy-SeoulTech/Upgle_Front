import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, setImage, uploadImages } from '../../../modules/image';
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
  const { images } = useSelector((state) => state.image);
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
    if (user?.profile) {
      dispatch(setImage(user.profile.profileImage));
    }
  }, [user]);

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
      updatedProfile={updatedProfile}
      checkedPassword={checkedPassword}
      changedPassword={changedPassword}
    />
  );
};

export default ProfileSettingContainer;
