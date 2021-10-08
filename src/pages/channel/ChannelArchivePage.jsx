import React from 'react';
import ChannelArchiveContainer from '../../containers/channel/ChannelArchiveContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelArchivePage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelArchiveContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelArchivePage;
