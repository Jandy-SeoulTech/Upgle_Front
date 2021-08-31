import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import MyChannel from '../../components/channel/MyChannel';
import { getMychannel } from '../../modules/channel';

const MyChannelContainer = () => {
  const [asignChatList] = useState([
    {
      id: 1,
      title: '밀프랩 도시락 싸는 방법',
      total: 72,
      owner: '먹짱은 나다',
      channel: '건강한 다이어트 식단 만들기',
    },
    {
      id: 2,
      title: '밀프랩 도시락 싸는 방법',
      total: 72,
      owner: '먹짱은 나다',
      channel: '건강한 다이어트 식단 만들기',
    },
    {
      id: 3,
      title: '밀프랩 도시락 싸는 방법',
      total: 72,
      owner: '먹짱은 나다',
      channel: '건강한 다이어트 식단 만들기',
    },
    {
      id: 4,
      title: '밀프랩 도시락 싸는 방법',
      total: 72,
      owner: '먹짱은 나다',
      channel: '건강한 다이어트 식단 만들기',
    },
  ]);
  const { myChannel } = useSelector((state) => state.channel);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMychannel());
  }, [dispatch]);

  if (!asignChatList || !myChannel) return '로딩중';
  return (
    <MyChannel
      asignChatList={asignChatList}
      adminChannl={myChannel.adminChannl}
      participantChannel={myChannel.participantChannel}
    />
  );
};

export default MyChannelContainer;
