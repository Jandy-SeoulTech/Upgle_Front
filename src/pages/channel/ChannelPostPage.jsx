import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';
import ChannelPostContainer from './../../containers/channel/ChannelPostContainer';

const ChannelPostPage = ({ match }) => {
  const { channelId, postId } = match.params;
  <>
    <HeaderContainer />
    <ChannelNavContainer />
    <ChannelPostContainer
      channelId={parseInt(channelId, 10)}
      postId={parseInt(postId, 10)}
    />
    <FooterContainer />
  </>;
};

export default ChannelPostPage;
