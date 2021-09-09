import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getChannelData } from '../modules/channel';

const CheckJoinChannel = ({ Component, match }) => {
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const [finished, setFinished] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const { channelId } = match.params; // URL 파라미터 조회하기
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (channel && user) {
      channel.admin.id === user.id && setIsParticipant(true);
      for (let participant of channel.participants) {
        if (participant.userId === user.id) {
          setIsParticipant(true);
          break;
        }
      }
      setFinished(true);
    }
  }, [channel, user]);

  useEffect(() => {
    if (finished) {
      if (!isParticipant) {
        alert('먼저 채널에 가입해주세요');
        history.push(`/channel/${channelId}/profile`);
      }
    }
  }, [finished]);

  useEffect(() => {
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel || !user) return null;

  return <Component match={match} />;
};

export default CheckJoinChannel;
