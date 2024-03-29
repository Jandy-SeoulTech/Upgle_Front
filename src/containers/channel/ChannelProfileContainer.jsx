import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelProfile from '../../components/channel/ChannelProfile';
import {
  banUser,
  enterChannel,
  exitChannel,
  getChannelData,
  initChannel,
  likeChannel,
  passAdmin,
  unLikeChannel,
} from '../../modules/channel';
import { profileFollow, profileUnfollow } from '../../modules/profile';
import { follow, unfollow } from '../../modules/user';
import { setChannel } from '../../modules/write';
import { getChannelArchive } from '../../modules/archive';

const ChannelProfileContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { channelArchive } = useSelector((state) => state.archive);
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

  const onBanUser = ({ userId, username }) => {
    const yes = window.confirm(`${username}님을 채널에서 내보내겠습니까?`);
    if (yes) {
      dispatch(banUser({ adminId: user.id, userId, channelId: channel.id }));
    }
  };

  const onPassAdmin = ({ userId, username }) => {
    const yes = window.confirm(`${username}님께 채널 관리 권한을 넘겨주시겠습니까?`);
    if (yes) {
      dispatch(passAdmin({ adminId: user.id, userId, channelId: channel.id }));
    }
  };

  useEffect(() => {
    dispatch(getChannelArchive({ channelId, query: 'page=1&pageSize=5' }));
    dispatch(getChannelData(channelId));
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
      channelArchive={channelArchive}
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
      onBanUser={onBanUser}
      onPassAdmin={onPassAdmin}
    />
  );
};

export default ChannelProfileContainer;
