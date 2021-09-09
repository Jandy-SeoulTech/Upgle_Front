import React from 'react';
import EditChannelContainer from '../../containers/channel/EditChannelContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const EditChannelPage = () => {
  return (
    <>
      <HeaderContainer />
      <EditChannelContainer />
      <FooterContainer />
    </>
  );
};

export default EditChannelPage;
