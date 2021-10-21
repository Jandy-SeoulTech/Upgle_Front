import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../components/common/UploadImage';
import { initImage, uploadProfileImage } from '../../modules/image';

const UploadImageContainer = (props) => {
  const { profileImage } = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const onUploadProfileImage = (formData) => {
    dispatch(uploadProfileImage(formData));
  };

  const onInitImage = () => {
    dispatch(initImage());
  };

  return (
    <UploadImage
      profileImage={profileImage}
      onUploadProfileImage={onUploadProfileImage}
      onInitImage={onInitImage}
    />
  );
};

export default UploadImageContainer;
