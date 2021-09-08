import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';
import ChannelPostContainer from './../../containers/channel/ChannelPostContainer';

const ChannelPostPage = () => (
    <>
        <HeaderContainer />
        <ChannelNavContainer />
        <ChannelPostContainer />
        <FooterContainer />
    </>
);

export default ChannelPostPage;
