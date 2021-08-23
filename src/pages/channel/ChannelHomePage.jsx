import React from 'react';
import ChannelHomeContainer from '../../containers/channel/ChannelHomeContainer copy';
import ChatListContainer from '../../containers/chat/ChatListContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ChannelProfilePage = ({ match }) => {
  const { id } = match.params; // URL 파라미터 조회하기
  return (
    <>
      <HeaderContainer />
      <ChannelHomeContainer
        ChatListComponent={ChatListContainer}
        channelId={parseInt(id, 10)}
      />
      <FooterContainer />
    </>
  );
};

export default ChannelProfilePage;
