import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChannelPost from './../../components/channel/ChannelPost';


const ChannelPostContainer = ({ }) => {

  /*   const { user } = useSelector((state) => state.user);
   */
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
  const post = {
    title: '가나다는 한국어 자음의 첫 세글자다.',
    content: '가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다.  첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. 가나다는 한국어 자음의 첫 세글자다. ',
    status: 'Close',
    authorId: 1,
    author: {
      nickname: "제빵왕",
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
          nickname: "testnick",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '가나다는 한국어 자음의 첫 세글자다.',
        createdAt: "2021-09-06T11:48:50.171Z",
        updatedAt: "2021-09-07T11:48:50.171Z",
      },
      {
        author: {
          nickname: "제빵왕",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '가나다는 한국어 자음의 첫 세글자다.',
        createdAt: "2021-09-06T11:48:50.171Z",
        updatedAt: "2021-09-07T11:48:50.171Z",
      },
      {
        author: {
          nickname: "제빵왕",
          profile: {
            profileImage: {
              src: "admin.jpg"
            }
          }
        },
        content: '가나다는 한국어 자음의 첫 세글자다.',
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
