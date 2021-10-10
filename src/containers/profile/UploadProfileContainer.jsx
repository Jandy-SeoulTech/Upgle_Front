import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import UploadProfile from '../../components/profile/UploadProfile';
import { check } from '../../modules/user';
import { changeProfile, uploadProfile } from '../../modules/write';

const UploadProfileContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { department, introduce, wellTalent, interestTalent } = useSelector(
    (state) => state.write.writeProfile,
  );
  const { images } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changeProfile({ key, value }));
  };

  const handleUploadProfile = async () => {
    try {
      await dispatch(
        uploadProfile({
          userId: user.id,
          department,
          introduce,
          wellTalent,
          interestTalent,
          src: images[0] || null,
        }),
      );
      dispatch(check());
      alert('등록이 완료됐습니다!');
    } catch {
      alert('등록을 실패했습니다.');
    }
  };

  useEffect(() => {
    if (user && user.profile) {
      history.push('/');
    }
  }, [history, user]);

  if (!user) return 'loading';
  return (
    <UploadProfile
      user={user}
      data={{ department, introduce, wellTalent, interestTalent, images }}
      handleChangeFiled={handleChangeFiled}
      handleUploadProfile={handleUploadProfile}
    />
  );
};

export default UploadProfileContainer;
