import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../components/common/UploadImage';
import { initialize, uploadImages } from '../../modules/image';

const UploadImageContainer = (props) => {
  const { images } = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const uploadImage = (formData) => {
    dispatch(uploadImages(formData));
  };

  const initializeImage = () => {
    dispatch(initialize());
  };
  return (
    <UploadImage
      images={images}
      uploadImage={uploadImage}
      initializeImage={initializeImage}
    />
  );
};

export default UploadImageContainer;
