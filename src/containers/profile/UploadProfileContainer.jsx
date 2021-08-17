import React from 'react';
import { useSelector } from 'react-redux';
import UploadProfile from '../../components/profile/UploadProfile';

const UploadProfileContainer = (props) => {
  const { user } = useSelector((state) => state.user);

  return <UploadProfile user={user} />;
};

export default UploadProfileContainer;
