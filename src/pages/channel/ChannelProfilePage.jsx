import React from 'react';
import ChannelProfileContainer from '../../containers/channel/ChannelProfileContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelProfilePage = ({ match }) => {
  const { id } = match.params; // URL 파라미터 조회하기
  return (
    <>
      <HeaderContainer />
      <ChannelProfileContainer channelId={parseInt(id, 10)} />
      <FooterContainer />
    </>
  );
};

export default ChannelProfilePage;
