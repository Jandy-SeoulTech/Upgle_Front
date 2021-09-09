import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelPostListContainer from './../../containers/channel/ChannelPostListContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelPostListPage = ({ match }) => {
    const { id } = match.params;
    <>
        <HeaderContainer />
        <ChannelNavContainer />
        <ChannelPostListContainer channelId={parseInt(id, 10)}/>
        <FooterContainer />
    </>

};


export default ChannelPostListPage;
