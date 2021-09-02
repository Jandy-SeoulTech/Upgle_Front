/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@material-ui/core';
import Department from './Department';
import InterestTalent from './InterestTalent';
import Introduce from './Introduce';
import ProfileImage from './ProfileImage';
import WellTalent from './WellTalent';

const ContentReducer = ({ step, data, handleChangeFiled }) => {
  switch (step) {
    case 0:
      return (
        <WellTalent
          wellTalent={data.wellTalent}
          handleChangeFiled={handleChangeFiled}
        />
      );
    case 1:
      return (
        <InterestTalent
          interestTalent={data.interestTalent}
          handleChangeFiled={handleChangeFiled}
        />
      );
    case 2:
      return (
        <Department
          department={data.department}
          handleChangeFiled={handleChangeFiled}
        />
      );
    case 3:
      return (
        <Introduce
          introduce={data.introduce}
          handleChangeFiled={handleChangeFiled}
        />
      );
    case 4:
      return <ProfileImage />;
    default:
      throw new Error('Unknown step');
  }
};

const UploadProfileForms = ({ step, data, handleChangeFiled }) => {
  return (
    <Box css={formWrapper}>
      {ContentReducer({ step, data, handleChangeFiled })}
    </Box>
  );
};

const formWrapper = css`
  display: flex;
  flex-direction: column;
`;

export default UploadProfileForms;
