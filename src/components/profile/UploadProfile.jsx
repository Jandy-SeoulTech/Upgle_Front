/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '../common/Button';
import { Box, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { ReactComponent as LogoWithTextTemp } from '../../lib/assets/logoWithTextTemp.svg';
import { ReactComponent as LogoWithTextTemp2 } from '../../lib/assets/logoWithTextTemp2.svg';
import { ReactComponent as Rafiki } from '../../lib/assets/rafiki.svg';
import { ReactComponent as ArrowLeft } from '../../lib/assets/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../lib/assets/arrowRight.svg';
import palette from '../../lib/styles/palette';
import UploadWellTalent from './UploadWellTalent';
import UploadInterestTalent from './UploadInterestTalent';
import UploadDepartment from './UploadDepartment';
import UploadIntroduce from './UploadIntroduce';
import UploadImage from './UploadImage';

const UploadProfile = ({
  user,
  welltalent,
  interesttalent,
  department,
  introduce,
  images,
  handleChangeFiled,
  handleUploadProfile,
  uploadImage,
  initializeImage,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const m1200 = useMediaQuery('(max-width: 1199px)');

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleNextButton = (step) => {
    switch (step) {
      case 0:
        return (
          <Button
            onClick={handleNext}
            css={welltalent.length === 0 && skipButton}
          >
            {welltalent.length === 0 ? (
              '건너뛰기'
            ) : (
              <>
                계속 <ArrowRight />
              </>
            )}
          </Button>
        );
      case 1:
        return (
          <Button
            onClick={handleNext}
            css={interesttalent.length === 0 && skipButton}
          >
            {interesttalent.length === 0 ? (
              '건너뛰기'
            ) : (
              <>
                계속 <ArrowRight />
              </>
            )}
          </Button>
        );
      case 2:
        return (
          <Button onClick={handleNext} css={department === '' && skipButton}>
            {department === '' ? (
              '건너뛰기'
            ) : (
              <>
                계속 <ArrowRight />
              </>
            )}
          </Button>
        );
      case 3:
        return (
          <Button onClick={handleNext} css={introduce === '' && skipButton}>
            {introduce === '' ? (
              '건너뛰기'
            ) : (
              <>
                계속 <ArrowRight />
              </>
            )}
          </Button>
        );
      case 4:
        return (
          <Button
            onClick={handleUploadProfile}
            css={images.length === 0 && skipButton}
          >
            {images.length === 0 ? '건너뛰기' : '제출'}
          </Button>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UploadWellTalent
            welltalent={welltalent}
            handleChangeFiled={handleChangeFiled}
          />
        );
      case 1:
        return (
          <UploadInterestTalent
            interesttalent={interesttalent}
            handleChangeFiled={handleChangeFiled}
          />
        );
      case 2:
        return (
          <UploadDepartment
            department={department}
            handleChangeFiled={handleChangeFiled}
          />
        );
      case 3:
        return (
          <UploadIntroduce
            introduce={introduce}
            handleChangeFiled={handleChangeFiled}
          />
        );
      case 4:
        return (
          <UploadImage
            images={images}
            uploadImage={uploadImage}
            initializeImage={initializeImage}
          />
        );
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
            {getStepContent(activeStep)}
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
            {handleNextButton(activeStep)}
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
  font-size: 34px;
  margin-left: 67px;
  margin-top: 110px;
`;

const UploadFormDescription = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 700;
  font-size: 24px;
  margin-left: 67px;
  margin-top: 52px;
`;

const uploadFormTitleLogo = css`
  position: relative;
  top: 220px;
  left: 280px;
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

const skipButton = css`
  border: 2px solid ${palette.black};
  background-color: ${palette.white} !important;
  color: ${palette.black} !important;
  &:hover {
    border: 2px solid ${palette.black};
    background-color: rgba(189, 189, 189, 0.5) !important;
  }
`;

export default UploadProfile;
