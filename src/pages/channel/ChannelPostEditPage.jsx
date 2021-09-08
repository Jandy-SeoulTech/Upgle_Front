import React from 'react';
import ChannelPostEditContainer from '../../containers/channel/ChannelPostEditContainer';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChannelNavContainer from './../../containers/channel/ChannelNavContainer';

const ChannelProfilePage = ({}) => {
    return (
        <>
            <HeaderContainer />
            <ChannelNavContainer />
            <ChannelPostEditContainer />
        </>
    );
};

export default ChannelProfilePage;
