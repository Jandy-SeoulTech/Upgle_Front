import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelData } from '../../modules/channel';
import ChannelPost from './../../components/channel/ChannelPost';


const ChannelPostContainer = ({ channelId, postId }) => {

  /*   const { user } = useSelector((state) => state.user);
   */
  const { channel } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel) return '로딩중';

  
  const post = {
    title: 'Express에서 세션 어떻게 적용하나요?',
    content: '안녕하세요. 저는 어제 방금 node로 서버 개발하기를 시작한 초보입니다. 노드는 express라는 프레임워크를 활용해서 많이들 사용한다고 하는데, 제가 로그인/인증 모듈을 구현하는 중입니다. 세션과 쿠키를 이용해서 인증 모듈을 구현하려는데, express에서 세션을 어떻게 적용할지 구체적인 방법을 검색했는데도 잘 모르겠어서 고수 분들의 도움을 받고 싶습니다. 어떤 방법이 있고 어떤 기술이 베스트 프랙티스일까요???',
    status: 'Open',
    authorId: 1,
    author: {
      nickname: "노드어린이",
      profile: {
        profileImage: {
          src: "admin.jpg"
        }
      }
    },
    updatedAt: "2021-09-07T11:48:50.171Z",
    comment: [
      {
        author: {
          nickname: "노드발자",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '세션은 보통 express-session 라이브러리를 활용합니다.',
        createdAt: "2021-09-06T11:48:50.171Z",
        updatedAt: "2021-09-07T11:48:50.171Z",
      },
      {
        author: {
          nickname: "노드린이",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '저도 궁금합니다.. 고수분들 도와주세요~~',
        createdAt: "2021-09-06T11:48:50.171Z",
        updatedAt: "2021-09-07T11:48:50.171Z",
      },
      {
        author: {
          nickname: "킹갓엠페러프론트리드인서",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '제가 가르쳐드림.',
        createdAt: "2021-09-06T11:48:50.171Z",
        updatedAt: "2021-09-07T11:48:50.171Z",
      },
    ],
  };

  const user = {
    "id": 1,
    "nickname": "testnick",
    "email": "test@test.com",
    "provider": "local"
  };

  return (
    <ChannelPost
      post={post}
      channel={channel}
      user={user}
    />
  );
};

export default ChannelPostContainer;
