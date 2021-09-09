/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../common/Button';
import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';
import { ReactComponent as Rafiki } from '../../lib/assets/rafiki.svg';
import { ReactComponent as ArrowLeft } from '../../lib/assets/arrowLeft.svg';
import palette from '../../lib/styles/palette';

import NextButton from './NextButton';
import { UploadProfileForms } from '../UploadProfileForms';

const UploadProfile = ({
  user,
  data,
  handleChangeFiled,
  handleUploadProfile,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const m1200 = useMediaQuery('(max-width: 1199px)');

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 4) {
      handleUploadProfile();
    } else {
      setActiveStep(activeStep + 1);
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
          lg={5}
          css={[uploadFormHeader, m1200 && smallUploadFormHeader]}
        >
          <Typography variant="h4" css={UploadFormTitle}>
            반갑습니다, {user.nickname}님!
          </Typography>
          <Typography css={UploadFormDescription}>
            업글을 이용하기 전에
            <br />
            몇가지 정보를 입력해 주세요.
          </Typography>
          <Rafiki css={uploadFormTitleLogo} />
        </Grid>
        <Grid
          item
          xs={12}
          lg={7}
          css={[uploadFormSection, m1200 && smallUploadFormSection]}
        >
          <Box css={uploadFormContent}>
            <Typography>{activeStep + 1}/5</Typography>
            <UploadProfileForms
              step={activeStep}
              data={data}
              handleChangeFiled={handleChangeFiled}
            />
          </Box>
          <Box css={buttonWrapper}>
            {activeStep !== 0 ? (
              <Button onClick={handleBack}>
                <ArrowLeft />
                이전
              </Button>
            ) : (
              <Box sx={{ flex: 1 }}></Box>
            )}
            <NextButton
              data={data}
              activeStep={activeStep}
              onClick={handleNext}
            />
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
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 1);
  border-radius: 10px;
  width: 71.875rem;
  height: 43.75rem;
`;

const smallUploadForm = css`
  width: 100vw;
  height: 100vh;
`;

const uploadFormHeader = css`
  width: 30.625rem;
  background: ${palette.white};
  border-radius: 10px 0 0 10px;
`;

const smallUploadFormHeader = css`
  border-radius: 0;
`;

const UploadFormTitle = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: bold;
  font-size: 2.125rem;
  width: 23.75rem;
  margin-left: 3.4375rem;
  margin-top: 6.875rem;
  word-wrap: break-word;
  word-break: keep-all;
`;

const UploadFormDescription = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  margin-left: 3.4375rem;
  margin-top: 3.75rem;
`;

const uploadFormTitleLogo = css`
  position: relative;
  top: 12rem;
  left: 17.5rem;
`;

const uploadFormSection = css`
  background: #f0f0f0;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const smallUploadFormSection = css`
  border-radius: 0;
`;

const uploadFormContent = css`
  flex: 1;
  margin-top: 142px;
  margin-left: 155px;
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .MuiButton-root {
    display: flex;
    justify-content: space-around;
    width: 6.25rem;
    height: 2.5rem;
    margin: 2.0625rem 1.875rem;
    background: ${palette.black};
    border-radius: 50px;
    color: ${palette.white};
    font-size: 1rem;
    font-weight: bold;
    border-color: ${palette.black};
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export default UploadProfile;
