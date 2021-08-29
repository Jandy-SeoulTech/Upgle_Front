/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { ReactComponent as Check } from '../../lib/assets/check.svg';

const categories = [
  '외국어',
  '미술/공예',
  '디자인',
  '음악',
  '연기/마술',
  '댄스',
  '사진/영상',
  '취미 생활',
  '투자/부업',
  '스포츠',
  '건강',
  '커리어',
  '시험/자격증',
  '패션/뷰티',
  '요리/ 조리',
  '펫/반려동물',
  '홈리빙 / 인테리어',
  '인간관계',
  '여행',
  '라이프',
  '학문',
  '프로그래밍',
  '창업',
  '기타',
];

const CreateChannel = (props) => {
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
              태그 입력 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" variant="outlined" css={FormInput} />
            </Grid>
          </Grid>
          <Grid container css={FormContent}>
            <Grid item xs={4} css={FormTitle}>
              채널 프로필 사진 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" variant="outlined" css={FormInput} />
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
  align-items: center;
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

export default CreateChannel;
