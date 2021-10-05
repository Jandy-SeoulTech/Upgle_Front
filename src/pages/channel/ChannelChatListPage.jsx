import React from 'react';
import ChannelChatListContainer from '../../containers/channel/ChannelChatListContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelChatListPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelChatListContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelChatListPage;
