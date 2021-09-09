import React from 'react';
import ChannelHomeContainer from '../../containers/channel/ChannelHomeContainer';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelHomePage = ({ match }) => {
  const { channelId } = match.params; // URL 파라미터 조회하기
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelHomeContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelHomePage;
