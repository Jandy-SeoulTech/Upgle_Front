/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid } from '@material-ui/core';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { ReactComponent as KakaoIcon } from '../../lib/assets/kakaoIcon.svg';
import { ReactComponent as GoogleIcon } from '../../lib/assets/googleIcon.svg';
import { ReactComponent as NaverIcon } from '../../lib/assets/naverIcon.svg';

const OAuth = ({ onKakaoOauth, onGoogleOauth }) => {
  return (
    <Box sx={oAuthForm}>
      <Grid item container xs={4} justifyContent="center">
        <KakaoLogin
          useLoginForm={true}
          token={process.env.REACT_APP_KAKAO_SECRET}
          onSuccess={(result) => {
            console.log(result);
            onKakaoOauth(result.response.access_token);
          }}
          onFail={(result) => console.log(result)}
          render={(props) => <KakaoIcon {...props} css={oAuthIcon}></KakaoIcon>}
        ></KakaoLogin>
      </Grid>
      <Grid item container xs={4} justifyContent="center">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(props) => (
            <GoogleIcon {...props} css={oAuthIcon}></GoogleIcon>
          )}
          onSuccess={(result) => onGoogleOauth(result.accessToken)}
          onFailure={(result) => console.log(result)}
          cookiePolicy={'single_host_origin'}
        />
      </Grid>
      <Grid item container xs={4} justifyContent="center">
        <div id="naverIdLogin"></div>
        <NaverIcon css={oAuthIcon}></NaverIcon>
      </Grid>
    </Box>
  );
};

const oAuthForm = css`
  display: flex;
  justify-content: center;
  margin-top: 3.25rem;
  width: 21.875rem;
`;

const oAuthIcon = css`
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
  }
`;

export default OAuth;
