import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getChannelData } from '../../modules/channel';
import { changeArchive, createArchive, editArchive } from '../../modules/write';
import { uploadImage } from '../../lib/api/image';
import { concatImage } from '../../modules/image';
import { initialize as initializePost } from '../../modules/write';
import { initialize as initializeImages } from '../../modules/write';
import EditArchive from '../../components/archive/EditArchive';

const EditArchiveContainer = ({ channelId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { writeArchive } = useSelector((state) => state.write);
  const { user } = useSelector((state) => state.user);
  const { images } = useSelector((state) => state.image);
  const { channel } = useSelector((state) => state.channel);

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changeArchive({ key, value }));
  };

  const imageHook = async (blob, callback) => {
    let formData = new FormData();
    formData.append('files', blob);
    const imgUrl = await uploadImage(formData);
    dispatch(concatImage(imgUrl));
    callback(imgUrl, 'alt text');
  };

  const onWriteChannelArchive = async () => {
    if (!writeArchive.title) {
      alert('제목을 입력해주세요');
      return;
    }
    try {
      if (writeArchive.archiveId) {
        await dispatch(editArchive({ ...writeArchive, channelId, images }));
        alert('수정을 성공했습니다.');
      } else {
        await dispatch(createArchive({ ...writeArchive, channelId, images }));
        alert('등록을 성공했습니다.');
      }
    } catch {
      alert('등록을 실패했습니다.');
    }
    history.push(`/channel/${channelId}/archive`);
  };

  useEffect(() => {
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initializePost());
      dispatch(initializeImages());
    };
  }, [dispatch, channelId]);

  return (
    <EditArchive
      archive={writeArchive}
      channel={channel}
      user={user}
      onWriteChannelPost={onWriteChannelArchive}
      handleChangeFiled={handleChangeFiled}
      imageHook={imageHook}
    />
  );
};

export default EditArchiveContainer;
