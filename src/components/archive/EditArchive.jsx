/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { TagInput, TextField } from '../TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import editorConfig from '../../lib/util/editorConfig';
import { useRef } from 'react';
import TagBox from '../common/TagBox';

const EditArchive = ({
  archive,
  channel,
  user,
  onWriteChannelPost,
  handleChangeFiled,
  imageHook,
}) => {
  const editorRef = useRef();

  const onTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      handleChangeFiled({ key: 'title', value: e.target.value });
    }
  };

  const onIsNoticeChange = (e) => {
    handleChangeFiled({ key: 'status', value: e.target.checked ? 'Notice' : 'Close' });
  };

  return (
    <Box css={wrapper}>
      <Box css={{ width: '71.25rem', display: 'flex', flexDirection: 'column' }}>
        <TextField
          css={titleInput}
          value={archive.title}
          placeholder="제목을 입력해주세요."
          multiline={true}
          onChange={onTitleChange}
        />
        <Box css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={archive.status === 'Public'}
                css={checkBox}
                onChange={(e) => {
                  handleChangeFiled({
                    key: 'status',
                    value: e.target.checked ? 'Public' : archive.status,
                  });
                }}
              />
            }
            label="전체 공개"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={archive.status === 'Private'}
                css={checkBox}
                onChange={(e) => {
                  handleChangeFiled({
                    key: 'status',
                    value: e.target.checked ? 'Private' : archive.status,
                  });
                }}
              />
            }
            label="채널 공개"
          />
        </Box>
        <Box css={editorConfig.editorCss}>
          <Editor
            ref={editorRef}
            onChange={() => {
              handleChangeFiled({
                key: 'content',
                value: editorRef.current.getInstance().getMarkdown(),
              });
            }}
            language="ko"
            initialValue={archive.content}
            placeholder={archive.content.length === 0 && '재능공유 요청을 작성해주세요'}
            initialEditType="wysiwyg"
            previewStyle="vertical"
            height="calc(100vh - 13.4375rem)"
            useCommandShortcut={true}
            customHTMLRenderer={editorConfig.renderer}
            hooks={{ addImageBlobHook: imageHook }}
          />
        </Box>
        <Box>
          <Box css={tagInput}>
            <Typography># 태그 입력</Typography>
            <TagInput
              tagList={archive.tags}
              onCreate={(input) => {
                handleChangeFiled({
                  key: 'tags',
                  value: archive.tags.concat(input),
                });
              }}
              size="small"
            />
          </Box>
          <TagBox
            css={tagBox}
            tagList={archive.tags}
            onClick={(index) => {
              handleChangeFiled({
                key: 'tags',
                value: archive.tags.filter((input, i) => index !== i),
              });
            }}
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <Button
            css={submitBtn}
            onClick={onWriteChannelPost}
            disabled={!archive.title || !archive.content}
          >
            작성 완료
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

const wrapper = css`
  margin-top: 8.4375rem;
  background-color: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
  padding-bottom: 6rem;
  font-size: 1.875rem;
  display: flex;
  flex-direction: column;
`;

const titleInput = css`
  height: fit-content;
  min-height: 4.375rem;
  textarea {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 2.125rem;
    line-height: 3.125rem;
  }
  margin-top: 1.875rem;
`;

const checkBox = css`
  &.Mui-checked {
    color: ${palette.orange};
  }
`;

const tagInput = css`
  display: flex;
  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    font-size: 1.125rem;
  }
  .MuiFormControl-root {
    flex: 1;
    margin-left: 2rem;
  }
`;

const tagBox = css`
  width: 100%;
  margin: 0;
  margin-top: 0.9375rem;
  margin-left: 7rem;
  .MuiBox-root {
    background-color: white;
    .MuiTypography-root {
      color: black;
    }
  }
`;

const submitBtn = css`
  margin: 1.25rem 0 1.25rem 0;
  width: 12.5rem;
  height: 3.5625rem;
  border-radius: 100px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  background: #000000;
  color: #ffffff;

  &:disabled {
    background: #e0e0e0;
    color: white;
    border: 0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
  }
`;

export default EditArchive;
