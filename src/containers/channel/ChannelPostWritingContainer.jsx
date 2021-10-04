import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelPostWriting from '../../components/channel/ChannelPostWriting';
import { getChannelData, writeChannelPost } from '../../modules/channel';

const ChannelPostWritingContainer = ({ channelId, isEdit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);

  useEffect(() => {
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  const onWriteChannelPost = async ({ channelId, title, status, content, images }) => {
    await dispatch(writeChannelPost({ channelId, title, status, content, images }));
    history.push(`/channel/${channelId}/postList`);
  };

  const initialVaue = '재능 공유 요청을 작성해주세요.';

  return (
    <ChannelPostWriting
      channel={channel}
      user={user}
      onWriteChannelPost={onWriteChannelPost}
      initialValue={initialVaue}
    />
  );
};

export default ChannelPostWritingContainer;
