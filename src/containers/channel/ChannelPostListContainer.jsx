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


  return (
    <ChannelPostList
      postList={postList}
    />
  );
};

export default ChannelPostListContainer;
