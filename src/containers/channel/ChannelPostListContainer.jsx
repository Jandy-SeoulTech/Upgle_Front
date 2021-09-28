import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData, getChannelPost } from '../../modules/channel';
import ChannelPostList from './../../components/channel/ChannelPostList';

const ChannelPostListContainer = ({ channelId }) => {
  /* const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    if (channel && user) {
      channel.admin.id === user.id && setIsParticipant(true);
      channel.participants.forEach(
        (participant) =>
          participant.userId === user.id && setIsParticipant(true),
      );
    }
  }, [channel, user]);
 */
  const { channel, postList } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelPost(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  return <ChannelPostList postList={postList} channel={channel} />;
};

export default ChannelPostListContainer;
