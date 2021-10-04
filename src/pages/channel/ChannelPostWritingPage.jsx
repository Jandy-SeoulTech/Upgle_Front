import React from 'react';
import ChannelPostWritingContainer from '../../containers/channel/ChannelPostWritingContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostWritingPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelPostWritingContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelPostWritingPage;
