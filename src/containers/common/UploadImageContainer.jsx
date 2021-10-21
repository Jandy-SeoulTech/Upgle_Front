import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../components/common/UploadImage';
import { initImage, uploadImage } from '../../modules/image';

const UploadImageContainer = (props) => {
  const { images } = useSelector((state) => state.image);
  const dispatch = useDispatch();

  const onUploadImage = (formData) => {
    dispatch(uploadImage(formData));
  };

  const onInitImage = () => {
    dispatch(initImage());
  };
  return <UploadImage images={images} onUploadImage={onUploadImage} onInitImage={onInitImage} />;
};

export default UploadImageContainer;
