/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { ReactComponent as Check } from '../../lib/assets/check.svg';
import UploadImageContainer from '../../containers/common/UploadImageContainer';
import categories from '../../lib/util/categories';
import { TagInput, TextArea, TextField } from '../TextField';
import TagBox from '../common/TagBox';

const EditChannel = ({ writeChannel, handleChangeFiled, editChannel }) => {
  return (
    <Box css={createChannelWrapper}>
      <Box css={createChannelContent}>
        <Typography css={title}>채널 {writeChannel.id ? '관리' : '만들기'}</Typography>
        <Paper css={description}>
          <span className="highlight">잠깐!</span> Upgle에는 재능을 공유하기 위한 다양한 채널이
          있습니다. 채널을 만들기 전에 재능을 공유하고 싶은 기존 채널이 있는지 탐색해보세요!{' '}
          <Button>재능 찾기</Button>
        </Paper>

        <Paper css={createChannelForm}>
          <Grid container css={formContent}>
            <Grid item xs={4} css={formTitle}>
              채널명 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                variant="outlined"
                value={writeChannel.name}
                onChange={(e) => {
                  handleChangeFiled({ key: 'name', value: e.target.value });
                }}
                maxLength={20}
                fullWidth
                css={formInput}
              />
            </Grid>
          </Grid>
          <Grid container css={formContent}>
            <Grid item xs={4} css={formTitle}>
              채널 소개 <Check />
            </Grid>
            <Grid item xs={8}>
              <TextArea
                value={writeChannel.introduce}
                maxLength={500}
                onChange={(e) => {
                  handleChangeFiled({
                    key: 'introduce',
                    value: e.target.value,
                  });
                }}
                size="small"
                variant="outlined"
                minRows={10}
                maxRows={16}
                css={formInput}
              />
            </Grid>
          </Grid>
          <Grid container css={formContent}>
            <Grid item xs={4} css={formTitle}>
              카테고리 <Check />
            </Grid>
            <Grid item xs={8}>
              <Select
                value={writeChannel.category}
                css={formSelect}
                onChange={(e) => {
                  handleChangeFiled({
                    key: 'category',
                    value: e.target.value,
                  });
                }}
              >
                {categories.map((category) => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container css={formContent}>
            <Grid item xs={4} css={formTitle}>
              태그 입력
            </Grid>
            <Grid item xs={8}>
              <TagInput
                tagList={writeChannel.tags}
                onCreate={(input) => {
                  handleChangeFiled({
                    key: 'tags',
                    value: writeChannel.tags.concat(input),
                  });
                }}
                variant="outlined"
                size="small"
                css={formInput}
              />
              <TagBox
                css={tagBox}
                tagList={writeChannel.tags}
                onClick={(index) => {
                  handleChangeFiled({
                    key: 'tags',
                    value: writeChannel.tags.filter((input, i) => index !== i),
                  });
                }}
              />
            </Grid>
          </Grid>
          <Grid container css={formContent}>
            <Grid item xs={4} css={formTitle}>
              채널 프로필 사진
            </Grid>
            <Grid item container xs={8} justifyContent="center">
              <UploadImageContainer />
              <Typography css={uploadImageDescription}>
                채널을 드러낼 수 있는 프로필 사진을 등록해주세요. 등록하지 않으면 기본 이미지로
                설정됩니다.
              </Typography>
            </Grid>
          </Grid>
          <Grid container css={formContent} justifyContent="flex-end">
            <Grid item container xs={8} justifyContent="center">
              <Button fullWidth css={createButton} onClick={editChannel}>
                {writeChannel ? '저장하기' : '만들기'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

const createChannelWrapper = css`
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  margin-top: 3.75rem;
`;

const createChannelContent = css`
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

const description = css`
  padding: 1.8125rem 3.0625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  .highlight {
    color: ${palette.orange};
  }
`;

const createChannelForm = css`
  margin-top: 1.875rem;
  margin-bottom: 6.25rem;
  border-radius: 10px;
`;

const formContent = css`
  padding: 3.3125rem 4.5625rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #bdbdbd;
`;

const formTitle = css`
  font-family: 'Noto Sans KR';
  font-size: 1.5rem;
  font-weight: bold;
`;

const formInput = css`
  width: 100%;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #7b7b7b;
    }
  }
`;

const formSelect = css`
  width: 100%;
  & .MuiSelect-root {
    border: 1px solid #7b7b7b;
    &:focus {
      border: 1px solid black !important;
    }
  }
`;

const tagBox = css`
  width: 100%;
  margin-left: 0.06rem;
  padding: 0.625rem 0.625rem 1.25rem 0.625rem;
  background-color: #e0e0e0;
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
