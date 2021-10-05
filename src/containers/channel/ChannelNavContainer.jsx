import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChannelNav from '../../components/channel/ChannelNav';

const ChannelNavContainer = (props) => {
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    console.log('변화 감지');
    if (channel && user) {
      setIsParticipant(false);
      channel.admin.id === user.id && setIsParticipant(true);
      channel.participants.forEach(
        (participant) => participant.userId === user.id && setIsParticipant(true),
      );
    }
  }, [channel, user]);

  if (!channel) return null;

  return <ChannelNav channel={channel} isParticipant={isParticipant} />;
};

export default ChannelNavContainer;
