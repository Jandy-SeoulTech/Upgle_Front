/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../common/Button';
import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';
import { ReactComponent as Rafiki } from '../../lib/assets/rafiki.svg';
import palette from '../../lib/styles/palette';
import UploadWellTalent from './UploadWellTalent';
import UploadInterestTalent from './UploadInterestTalent';
import UploadDepartment from './UploadDepartment';
import UploadIntroduce from './UploadIntroduce';
import UploadImage from './UploadImage';

const UploadProfile = ({ user }) => {
  const [activeStep, setActiveStep] = useState(0);
  const m1200 = useMediaQuery('(max-width: 1199px)');

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UploadWellTalent />;
      case 1:
        return <UploadInterestTalent />;
      case 2:
        return <UploadDepartment />;
      case 3:
        return <UploadIntroduce />;
      case 4:
        return <UploadImage />;

      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Box sx={UploadProfileWrapper}>
      {m1200 ? (
        <LogoWithTextTemp css={smallLogo} />
      ) : (
        <LogoWithTextTemp2 css={logo} />
      )}

      <Grid container css={[UploadForm, m1200 && smallUploadForm]}>
        <Grid
          item
          xs={12}
          lg={4}
          css={[uploadFormTitle, m1200 && smallUploadFormTitle]}
        >
          <Typography variant="h4">반갑습니다, {user.nickname}님!</Typography>
          <Typography variant="p">
            업글을 이용하기 전에
            <br />
            몇가지 정보를 입력해 주세요.
          </Typography>
          <Rafiki />
        </Grid>
        <Grid
          item
          xs={12}
          lg={8}
          css={[uploadFormContent, m1200 && smallUploadFormContent]}
        >
          {getStepContent(activeStep)}
          <Box>
            <Button>이전</Button>
            <Button>다음</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const UploadProfileWrapper = css`
  width: 100vw;
  height: 100vh;
  background: url('/image/authBackground.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const logo = css`
  width: 6.5625rem;
  height: 1.875rem;
  position: absolute;
  top: 2.1875rem;
  left: 2.0625rem;
`;

const smallLogo = css`
  width: 6.5625rem;
  height: 1.875rem;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
`;

const UploadForm = css`
  width: 71.875rem;
  height: 43.75rem;
`;

const smallUploadForm = css`
  width: 100vw;
  height: 100vh;
`;

const uploadFormTitle = css`
  background: ${palette.white};
  border-radius: 10px 0 0 10px;
`;

const smallUploadFormTitle = css`
  border-radius: 0;
`;

const uploadFormContent = css`
  background: #f0f0f0;
  border-radius: 0 10px 10px 0;
`;

const smallUploadFormContent = css`
  border-radius: 0;
`;

export default UploadProfile;
