import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ProfileSettingContainer from '../../containers/profile/setting/ProfileSettingContainer';

const ProfileSettingPage = (props) => (
    <>
        <HeaderContainer />
        <ProfileSettingContainer />
        <FooterContainer />
    </>
);

export default ProfileSettingPage;
