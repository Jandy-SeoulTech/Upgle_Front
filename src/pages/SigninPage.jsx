import React from 'react';
import OAuthContainer from '../containers/auth/OAuthContainer';
import SigninContainer from '../containers/auth/SigninContainer';

const SigninPage = (props) => (
  <>
    <SigninContainer OAuthComponent={OAuthContainer} />
  </>
);

export default SigninPage;
