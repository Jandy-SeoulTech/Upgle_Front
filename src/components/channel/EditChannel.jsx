/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { ReactComponent as Check } from '../../lib/assets/check.svg';
import UploadImageContainer from '../../containers/common/UploadImageContainer';
import categories from '../../lib/util/categories';

const EditChannel = (props) => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Box css={CreateChannelWrapper}>
      <Box css={CreateChannelContent}>
        <Typography css={title}>채널 만들기</Typography>
        <Paper css={Description}>
          <span className="highlight">잠깐!</span> Upgle에는 재능을 공유하기
          위한 다양한 채널이 있습니다. 채널을 만들기 전에 재능을 공유하고 싶은
          기존 채널이 있는지 탐색해보세요! <Button>재능 찾기</Button>
        </Paper>

        <Paper css={CreateChannelForm}>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              채널명 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="20자 이내로 입력해주세요"
                size="small"
                variant="outlined"
                css={FormInput}
              />
            </Grid>
          </Grid>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              채널 소개 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" variant="outlined" css={FormInput} />
            </Grid>
          </Grid>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              카테고리 <Check />
            </Grid>
            <Grid item xs={8}>
              <Select
                value={category}
                css={FormInput}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              태그 입력
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" variant="outlined" css={FormInput} />
            </Grid>
          </Grid>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              채널 프로필 사진
            </Grid>
            <Grid item container xs={8} justifyContent="center">
              <UploadImageContainer />
              <Typography css={uploadImageDescription}>
                채널을 드러낼 수 있는 프로필 사진을 등록해주세요. 등록하지
                않으면 기본 이미지로 설정됩니다.
              </Typography>
            </Grid>
          </Grid>
          <Grid container css={FormContent} justifyContent="flex-end">
            <Grid item container xs={8} justifyContent="center">
              <Button fullWidth css={createButton}>
                만들기
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

const CreateChannelWrapper = css`
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  margin-top: 3.75rem;
`;

const CreateChannelContent = css`
  width: 71.25rem;
`;

const title = css`
  font-family: 'Noto Sans KR';
  font-size: 2.125rem;
  font-weight: bold;
  text-align: center;
  margin-top: 3.75rem;
  margin-bottom: 3.125rem;
`;

const Description = css`
  padding: 1.8125rem 3.0625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  .highlight {
    color: ${palette.orange};
  }
`;

const CreateChannelForm = css`
  margin-top: 1.875rem;
  margin-bottom: 6.25rem;
  border-radius: 10px;
`;

const FormContent = css`
  padding: 3.3125rem 4.5625rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #bdbdbd;
`;

const FormTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 1.5rem;
  font-weight: bold;
`;

const FormInput = css`
  width: 100%;
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

const uploadImageDescription = css`
  margin-top: 1.978125rem;
  font-family: 'Noto Sans KR';
  font-size: 0.9375rem;
  font-weight: 500;
  color: #7b7b7b;
`;

const createButton = css`
  height: 3.875rem;
  background: #e0e0e0;
  border-radius: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 1.25rem;
  color: #5f5f5f;
`;

export default EditChannel;
