import React from 'react';
import ChannelRoomListContainer from '../../containers/channel/ChannelRoomListContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelRoomListPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelRoomListContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelRoomListPage;
