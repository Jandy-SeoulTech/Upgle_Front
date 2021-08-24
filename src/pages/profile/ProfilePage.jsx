import React from 'react';
import FooterContainer from '../../containers/common/FooterContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ProfileContainer from '../../containers/profile/ProfileContainer';

const ProfilePage = (props) => (
  <>
    <HeaderContainer />
    <ProfileContainer />
    <FooterContainer />
  </>
);

export default ProfilePage;
