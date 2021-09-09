import React from 'react';
import MyChannelContainer from '../../containers/channel/MyChannelContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const MyChannelPage = () => {
  return (
    <>
      <HeaderContainer />
      <MyChannelContainer />
      <FooterContainer />
    </>
  );
};

export default MyChannelPage;
