import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadProfile from '../../components/profile/UploadProfile';
import { changeField, uploadProfile } from '../../modules/write';

const UploadProfileContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.write);
  const dispatch = useDispatch();

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changeField({ key, value }));
  };

  const handleUploadProfile = () => {
    dispatch(uploadProfile(profile));
  };

  if (!profile) return;
  return (
    <UploadProfile
      user={user}
      profile={profile}
      handleChangeFiled={handleChangeFiled}
      handleUploadProfile={handleUploadProfile}
    />
  );
};

export default UploadProfileContainer;
