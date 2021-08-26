import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelProfile from '../../components/channel/ChannelProfile';
import { getChannelData } from '../../modules/channel';

const ChannelProfileContainer = ({ channelId }) => {
  const [channelData] = useState({
    title: '제빵의 제왕',
    total: 752,
    like: 538,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvuPs1MykkN3ArTT82yd_Th-FEpS_I52rwttkvYoh6xnppsi9DlSNa9UZLyPPTeSPgCCw&usqp=CAU',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    category: '요리 / 조리',
    tags: [
      '베이킹',
      '파티쉐',
      '마카롱',
      '샌드위치',
      '초코케이크',
      '치즈케이크',
      '치즈케이크',
      '치즈케이크',
      '치즈케이크',
      '딸기케이크',
    ],
    admin: {
      id: 1,
      nickname: '제빵왕김툴스',
      profile: {
        profileImage: {
          src: 'data:image/jpeg;base64,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',
        },
      },
    },
    participants: [
      {
        id: 1,
        nickname: '홍길동',
        profile: {
          profileImage: {
            src: 'https://mblogthumb-phinf.pstatic.net/20151028_167/kellysfinger_1446038212243OAWIa_JPEG/HMS_7408-copy.jpg?type=w2',
          },
        },
      },
      {
        id: 2,
        nickname: '홍길동',
        profile: {
          profileImage: {
            src: 'data:image/jpeg;base64,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',
          },
        },
      },
      { id: 3, nickname: '홍길동', profile: { profileImage: { src: '' } } },
      { id: 4, nickname: '홍길동', profile: { profileImage: { src: '' } } },
      { id: 5, nickname: '홍길동', profile: { profileImage: { src: '' } } },
      { id: 6, nickname: '홍길동', profile: { profileImage: { src: '' } } },
    ],
    collection: [
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
    ],
  });

  if (!channelData) return '로딩중';

  return <ChannelProfile channelData={channelData} />;
};

export default ChannelProfileContainer;
