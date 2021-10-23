import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getChannelData } from '../../modules/channel';
import { changePost, updatePost, createPost } from '../../modules/write';
import EditPost from '../../components/post/EditPost';
import { uploadImage } from '../../lib/api/image';
import { concatImage, initImage } from '../../modules/image';
import { initialize as initializeWrite } from '../../modules/write';

const EditPostContainer = ({ channelId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { writePost } = useSelector((state) => state.write);
  const { user } = useSelector((state) => state.user);
  const { images } = useSelector((state) => state.image);
  const { channel } = useSelector((state) => state.channel);

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changePost({ key, value }));
  };

  const imageHook = async (blob, callback) => {
    let formData = new FormData();
    formData.append('files', blob);
    const imgUrl = await uploadImage(formData);
    dispatch(concatImage(imgUrl));
    callback(imgUrl, 'alt text');
  };

  const onWriteChannelPost = async () => {
    if (!writePost.title) {
      alert('제목을 입력해주세요');
      return;
    }
    try {
      if (writePost.postId) {
        await dispatch(updatePost({ ...writePost, channelId, images }));
        alert('수정을 성공했습니다.');
      } else {
        await dispatch(createPost({ ...writePost, channelId, images }));
        alert('등록을 성공했습니다.');
      }
    } catch {
      alert('등록을 실패했습니다.');
    }
    history.push(`/channel/${channelId}/post`);
  };

  useEffect(() => {
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initializeWrite());
      dispatch(initImage());
    };
  }, [dispatch, channelId]);

  return (
    <EditPost
      post={writePost}
      channel={channel}
      user={user}
      onWriteChannelPost={onWriteChannelPost}
      handleChangeFiled={handleChangeFiled}
      imageHook={imageHook}
    />
  );
};

export default EditPostContainer;
