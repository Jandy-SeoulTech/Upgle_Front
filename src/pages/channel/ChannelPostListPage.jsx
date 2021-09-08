import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelPostListContainer from './../../containers/channel/ChannelPostListContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostListPage = () => (
    <>
        <HeaderContainer />
        <ChannelNavContainer/>
        <ChannelPostListContainer />
        <FooterContainer />
    </>
);

export default ChannelPostListPage;
