import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelProfile from '../../components/channel/ChannelProfile';
import {
  enterChannel,
  exitChannel,
  getChannelData,
  initChannel,
  likeChannel,
  unLikeChannel,
} from '../../modules/channel';
import { profileFollow, profileUnfollow } from '../../modules/profile';
import { follow, unfollow } from '../../modules/user';
import { setChannel } from '../../modules/write';

const ChannelProfileContainer = ({ channelId }) => {
  const [collection] = useState([
    {
      id: 1,
      title: '머핀이 잘 부풀지 않을 때 어떻게 해야할까?',
      createdAt: '2021.08.11',
      image: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2heqt7TxZUbE931X-x7ALY2wwxp40zxJBQ&usqp=CAU',
      },
    },
    {
      id: 3,
      title: '머핀이 잘 부풀지 않을 때 어떻게 해야할까?',
      createdAt: '2021.08.11',
      image: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-G51ZeeG3VS3dszzCGnGuIz5JdvqLfXDuQ&usqp=CAU',
      },
    },
    {
      id: 4,
      title: '머핀이 잘 부풀지 않을 때 어떻게 해야할까?',
      createdAt: '2021.08.11',
      image: { src: '' },
    },
    {
      id: 5,
      title: '머핀이 잘 부풀지 않을 때 어떻게 해야할까?',
      createdAt: '2021.08.11',
      image: { src: '' },
    },
    {
      id: 8,
      title: '머핀이 잘 부풀지 않을 때 어떻게 해야할까?',
      createdAt: '2021.08.11',
      image: { src: '' },
    },
  ]);

  const { channel } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.user);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onEnterChannel = async () => {
    await dispatch(enterChannel({ adminId: channel.adminId, channelId }));
    dispatch(getChannelData(channelId));
  };

  const onExitChannel = async () => {
    await dispatch(exitChannel({ adminId: channel.adminId, channelId }));
    dispatch(getChannelData(channelId));
  };

  const onLikeChannel = () => {
    dispatch(likeChannel(channelId));
  };

  const onUnLikeChannel = () => {
    dispatch(unLikeChannel(channelId));
  };

  const onEdit = async () => {
    await dispatch(setChannel(channel));
    history.push(`/channel/edit`);
  };

  const onFollow = ({ followingId }) => {
    dispatch(follow({ followingId }));
  };

  const onUnfollow = ({ followingId }) => {
    dispatch(unfollow({ followingId }));
  };

  const onProfileFollow = ({ followingId, isMe }) => {
    dispatch(profileFollow({ followingId, isMe }));
  };

  const onProfileUnfollow = ({ followingId, isMe }) => {
    dispatch(profileUnfollow({ followingId, isMe }));
  };

  useEffect(() => {
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initChannel());
    };
  }, [dispatch, channelId]);

  useEffect(() => {
    if (channel && user) {
      setIsParticipant(false);
      setIsLiked(false);
      channel.admin.id === user.id && setIsParticipant(true);
      channel.participants.forEach(
        (participant) => participant.userId === user.id && setIsParticipant(true),
      );
      channel.channelLike.forEach((like) => like.userId === user.id && setIsLiked(true));
    }
  }, [channel, user]);

  if (!channel || !user) return '로딩중';

  return (
    <ChannelProfile
      user={user}
      channel={channel}
      collection={collection}
      onEnterChannel={onEnterChannel}
      onExitChannel={onExitChannel}
      isParticipant={isParticipant}
      isLiked={isLiked}
      onLikeChannel={onLikeChannel}
      onUnLikeChannel={onUnLikeChannel}
      onEdit={onEdit}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      onProfileFollow={onProfileFollow}
      onProfileUnfollow={onProfileUnfollow}
    />
  );
};

export default ChannelProfileContainer;
