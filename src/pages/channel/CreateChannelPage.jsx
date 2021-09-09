import React from 'react';
import CreateChannelContainer from '../../containers/channel/CreateChannelContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const CreateChannelPage = () => {
  return (
    <>
      <HeaderContainer />
      <CreateChannelContainer />
      <FooterContainer />
    </>
  );
};

export default CreateChannelPage;
