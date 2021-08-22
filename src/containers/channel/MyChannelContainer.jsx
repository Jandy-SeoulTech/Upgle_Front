import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyChannel from '../../components/channel/MyChannel';

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
  const [openChannelList] = useState([
    {
      id: 1,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 58,
    },
    {
      id: 2,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 58,
    },
    {
      id: 3,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 53,
    },
    {
      id: 4,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 54,
    },
  ]);

  const [partChannelList] = useState([
    {
      id: 1,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 58,
    },
    {
      id: 2,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 58,
    },
    {
      id: 3,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 53,
    },
    {
      id: 4,
      title: '팝핀으로 우주 정복하기',
      total: 832,
      category: '댄스',
      tag: ['댄스', '팝핀', '공연'],
      adminId: 54,
    },
  ]);
  if (!asignChatList || !openChannelList || !partChannelList) return '로딩중';
  return (
    <MyChannel
      asignChatList={asignChatList}
      openChannelList={openChannelList}
      partChannelList={partChannelList}
    />
  );
};

export default MyChannelContainer;
