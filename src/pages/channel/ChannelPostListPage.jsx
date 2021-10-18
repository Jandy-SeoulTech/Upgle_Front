import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelPostListContainer from '../../containers/channel/ChannelPostListContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostListPage = ({ match }) => {
  const { channelId } = match.params;
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelPostListContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelPostListPage;
