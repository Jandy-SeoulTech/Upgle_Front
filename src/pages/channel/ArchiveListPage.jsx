import React from 'react';
import ArchiveListContainer from '../../containers/archive/ArchiveListContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ArchiveListPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ArchiveListContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ArchiveListPage;
