import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EditPost from '../../components/post/EditPost';
import { getChannelData } from '../../modules/channel';
import { writePost } from '../../modules/post';

const EditPostContainer = ({ channelId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);

  useEffect(() => {
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  const onWriteChannelPost = async ({ channelId, title, status, content, images }) => {
    await dispatch(writePost({ channelId, title, status, content, images }));
    history.push(`/channel/${channelId}/postList`);
  };

  const initialVaue = '재능 공유 요청을 작성해주세요.';

  return (
    <EditPost
      channel={channel}
      user={user}
      onWriteChannelPost={onWriteChannelPost}
      initialValue={initialVaue}
    />
  );
};

export default EditPostContainer;
