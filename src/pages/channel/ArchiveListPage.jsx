import React from 'react';
import ChannelArchiveListContainer from '../../containers/channel/ChannelArchiveListContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ArchiveListPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelArchiveListContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ArchiveListPage;
