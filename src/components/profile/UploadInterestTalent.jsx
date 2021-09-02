/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import ClearIcon from '@material-ui/icons/Clear';
import { TalentInput } from '../TextField';

const UploadInterestTalent = ({ interestTalent, handleChangeFiled }) => {
  const handleCreateTalent = (input) => {
    handleChangeFiled({
      key: 'interestTalent',
      value: interestTalent.concat(input),
    });
  };

  const handleDeleteTalent = (index) => {
    handleChangeFiled({
      key: 'interestTalent',
      value: interestTalent.filter((talent, i) => index !== i),
    });
  };

  return (
    <Box css={UploadInterestTalentWrapper}>
      <Typography css={title}>
        당신이 <span>관심있는 재능</span>을 알려주세요
      </Typography>

      <Grid container spacing={1} css={talentWrapper}>
        {interestTalent.map((talent, i) => (
          <Grid item key={i}>
            <Box
              onClick={() => {
                handleDeleteTalent(i);
              }}
            >
              <Typography>{talent}</Typography>
              <ClearIcon className="cancelIcon" />
            </Box>
          </Grid>
        ))}
      </Grid>

      <TalentInput
        autoFocus
        tallent={interestTalent}
        createTalent={handleCreateTalent}
        css={talentInput}
      />
    </Box>
  );
};

const UploadInterestTalentWrapper = css`
  display: flex;
  flex-direction: column;
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  span {
    color: ${palette.orange};
  }
`;

const talentWrapper = css`
  width: 30rem;
  margin-top: 3.8125rem;
  flex-wrap: wrap;
  .MuiBox-root {
    display: flex;
    align-items: center;
    height: 1.625rem;

    background: #7b7b7b;
    border: 1px solid #7b7b7b;
    border-radius: 20px;
    padding: 0.3125rem 0.625rem;

    .MuiTypography-root {
      color: ${palette.white};
      font-family: 'Barlow', 'Noto Sans KR';
      font-size: 0.75rem;
      text-align: center;
    }
    .cancelIcon {
      width: 0.8rem;
      height: 0.8rem;
      color: #7b7b7b;
      margin-left: 0.4375rem;
      display: none;
    }

    &:hover {
      cursor: pointer;
      background: rgba(130, 130, 130, 0.3);
      border: 1px solid #7b7b7b;
      .cancelIcon {
        display: block;
      }
      .MuiTypography-root {
        color: ${palette.black};
      }
    }
  }
`;

const talentInput = css`
  width: 21.875rem;
  margin-top: 7.75rem;
  .MuiInputLabel-root {
    color: black !important;
  }
`;

export default UploadInterestTalent;
