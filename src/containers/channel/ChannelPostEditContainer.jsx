import React, { useEffect } from 'react';
import ChannelPostEdit from '../../components/channel/ChannelPostEdit';
import { useSelector } from 'react-redux';


const ChannelPostEditContainer = ({ }) => {

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
  const user = {
    "id": 1,
    "nickname": "testnick",
    "email": "test@test.com",
    "provider": "local"
  };

  return(
    <ChannelPostEdit
      channel={channel}
      user={user}
    />
  );
};

export default ChannelPostEditContainer;
