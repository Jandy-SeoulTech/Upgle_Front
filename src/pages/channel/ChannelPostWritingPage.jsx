import React from 'react';
import ChannelPostWritingContainer from '../../containers/channel/ChannelPostWritingContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostWritingPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelPostWritingContainer channelId={parseInt(channelId, 10)} />
    </>
  );
};

export default ChannelPostWritingPage;
