import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import UploadProfile from '../../components/profile/UploadProfile';
import { initialize, uploadImages } from '../../modules/image';
import { check } from '../../modules/user';
import { changeField, uploadProfile } from '../../modules/write';

const UploadProfileContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { department, introduce, wellTalent, interestTalent } = useSelector(
    (state) => state.write.writeProfile,
  );
  const { profile, error } = useSelector((state) => state.write);
  const { images } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changeField({ key, value }));
  };

  const handleUploadProfile = () => {
    dispatch(
      uploadProfile({
        userId: user.id,
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

  useEffect(() => {
    if (profile) {
      alert('등록이 완료됐습니다!');
      dispatch(check());
    }
    if (error) {
      alert('등록을 실패했습니다.');
    }
  }, [history, profile, error]);

  useEffect(() => {
    if (user && user.profile) {
      history.push('/');
    }
  }, [history, user]);

  if (!user) return 'loading';
  return (
    <UploadProfile
      user={user}
      department={department}
      introduce={introduce}
      wellTalent={wellTalent}
      interestTalent={interestTalent}
      images={images}
      handleChangeFiled={handleChangeFiled}
      handleUploadProfile={handleUploadProfile}
      uploadImage={uploadImage}
      initializeImage={initializeImage}
    />
  );
};

export default UploadProfileContainer;
