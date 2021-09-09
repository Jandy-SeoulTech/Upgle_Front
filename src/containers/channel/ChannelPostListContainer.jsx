import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
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
  const { channel } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  const postList = [
    {
      id: 1,
      title: '질문은 이렇게 합니다.',
      content:
        '많은 초보 개발자들은 고수 개발자들에게 질문함으로서 도움을 받습니다. 그럼 질문을 어떻게 해야 좋은 도움을 받을 수 있을까요? 먼저 자신의 상황을 자세하게 설명해야 합니다. 그리고, 해결해야 할 문제 혹은 궁금한 부분을 명확하게 정의해야 합니다.',
      status: 'Notice',
      authorId: 1,
      author: {
        nickname: '채널주인',
        profile: {
          profileImage: {
            src: 'admin.jpg',
          },
        },
      },
      updatedAt: '2021-09-08T11:48:50.171Z',
    },
    {
      id: 2,
      title: 'Express에서 세션 어떻게 적용하나요?',
      content:
        '안녕하세요. 저는 어제 방금 node로 서버 개발하기를 시작한 초보입니다. 노드는 express라는 프레임워크를 활용해서 많이들 사용한다고 하는데, 제가 로그인/인증 모듈을 구현하는 중입니다. 세션과 쿠키를 이용해서 인증 모듈을 구현하려는데, express에서 세션을 어떻게 적용할지 구체적인 방법을 검색했는데도 잘 모르겠어서 고수 분들의 도움을 받고 싶습니다. 어떤 방법이 있고 어떤 기술이 베스트 프랙티스일까요???',
      status: 'Open',
      authorId: 3,
      author: {
        nickname: '노드어린이',
        profile: {
          profileImage: {
            src: 'admin.jpg',
          },
        },
      },
      updatedAt: '2021-08-28T11:48:50.171Z',
    },
    {
      id: 3,
      title: '노드js의 콜 스택 크기',
      content:
        '제가 이번에 노드로 깊은 재귀 함수를 사용하였는데, 스택 사이즈 초과 에러가 떴습니다. 근데 데이터 범위를 생각하면 재귀 횟수가 10000번을 넘어가지 않는거 같은데, 노드의 콜 스택 사이즈를 알수 있을까요? 이런 많지 않은 재귀 횟수인데 터지는 이유가 궁금합니다.',
      status: 'Reservation',
      authorId: 2,
      author: {
        nickname: '노드에브',
        profile: {
          profileImage: {
            src: 'admin.jpg',
          },
        },
      },
      updatedAt: '2021-08-28T11:48:50.171Z',
    },
    {
      id: 4,
      title: '패키지 매니저, 무엇이 좋을까?',
      content:
        '여러분은 npm vs yarn 중에 어떤게 좋다고 생각하세요? 같이 토론하실분 채팅열어요~',
      status: 'Close',
      authorId: 2,
      author: {
        nickname: 'Nodemon',
        profile: {
          profileImage: {
            src: 'admin.jpg',
          },
        },
      },
      updatedAt: '2021-08-28T11:48:50.171Z',
    },
    {
      id: 5,
      title: 'mvc 패턴 적용 방법',
      content:
        '노드에서 express 활용해서 mvc패턴을 적용하려는데, 디렉토리 구조를 어떻게 짜야 할지 감이 안옵니다. 따흑흑',
      status: 'Close',
      authorId: 2,
      author: {
        nickname: 'HSW',
        profile: {
          profileImage: {
            src: 'admin.jpg',
          },
        },
      },
      updatedAt: '2021-08-28T11:48:50.171Z',
    },
  ];

  return <ChannelPostList postList={postList} channel={channel} />;
};

export default ChannelPostListContainer;
