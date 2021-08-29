import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelProfile from '../../components/channel/ChannelProfile';
import { getChannelData, initailChannel } from '../../modules/channel';

const ChannelProfileContainer = ({ channelId }) => {
  const [like] = useState(538);
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
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getChannelData(channelId));
    return () => {
      dispatch(initailChannel());
    };
  }, [dispatch]);

  if (!channel) return '로딩중';

  return (
    <ChannelProfile channel={channel} collection={collection} like={like} />
  );
};

export default ChannelProfileContainer;
