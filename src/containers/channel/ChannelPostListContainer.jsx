import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChannelPostList from './../../components/channel/ChannelPostList';

const ChannelPostListContainer = (props) => {
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
  const postList = [
    {
      title: '가나다',
      content: '가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다.  첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. ',
      status: 'Notice',
      authorId: 1,
      author: {
        nickname: "제빵왕",
        profile: {
          profileImage: {
            src: "admin.jpg"
          }
        }
      },
      updatedAt: "2021-09-08T11:48:50.171Z",
    },
    {
      title: '가나다',
      content: '가나다는 한국어 자음의 첫 세글자다. ',
      status: 'Open',
      authorId: 1,
      author: {
        nickname: "제빵왕",
        profile: {
          profileImage: {
            src: "admin.jpg"
          }
        }
      },
      updatedAt: "2021-08-28T11:48:50.171Z",
    },
    {
      title: '가나다',
      content: '가나다는 한국어 자음의 첫 세글자다. ',
      status: 'Reservation',
      authorId: 2,
      author: {
        nickname: "제빵왕",
        profile: {
          profileImage: {
            src: "admin.jpg"
          }
        }
      },
      updatedAt: "2021-08-28T11:48:50.171Z",
    },
    {
      title: '가나다',
      content: '가나다는 한국어 자음의 첫 세글자다. ',
      status: 'Close',
      authorId: 2,
      author: {
        nickname: "HSW",
        profile: {
          profileImage: {
            src: "admin.jpg"
          }
        }
      },
      updatedAt: "2021-08-28T11:48:50.171Z",
    },
    {
      title: '가나다',
      content: '가나다는 한국어 자음의 첫 세글자다. ',
      status: 'Close',
      authorId: 2,
      author: {
        nickname: "HSW",
        profile: {
          profileImage: {
            src: "admin.jpg"
          }
        }
      },
      updatedAt: "2021-08-28T11:48:50.171Z",
    },
  ];

  const channel = {
    "id": 1,
    "name": "channel1",
    "introduce": "test",
    "adminId": 1,
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": null,
    "admin": {
      "id": 1,
      "email": "iqeq1945@naver.com",
      "nickname": "HSW",
      "profile": {
        "profileImage": {
          "src": null
        }
      }
    }
  };

  return (
    <ChannelPostList
      postList={postList}
      channel={channel}
    />
  );
};

export default ChannelPostListContainer;
