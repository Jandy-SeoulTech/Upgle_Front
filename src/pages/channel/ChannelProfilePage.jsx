import React from 'react';
import ChannelNavContainer from '../../containers/channel/ChannelNavContainer';
import ChannelProfileContainer from '../../containers/channel/ChannelProfileContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelProfilePage = ({ match }) => {
  const { channelId } = match.params; // URL 파라미터 조회하기
  return (
    <>
      <HeaderContainer />
      <ChannelNavContainer />
      <ChannelProfileContainer channelId={parseInt(channelId, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelProfilePage;
