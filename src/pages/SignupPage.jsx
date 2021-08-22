import React from 'react';
import OAuthContainer from '../containers/auth/OAuthContainer';
import SignupContainer from '../containers/auth/SignupContainer';

const SignupPage = (props) => (
  <>
    <SignupContainer OAuthComponent={OAuthContainer} />
  </>
);

export default SignupPage;
