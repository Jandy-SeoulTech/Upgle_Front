/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { TextField } from '../TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import editorConfig from '../../lib/util/editorConfig';
import { useRef } from 'react';

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
    <Grid container justifyContent="center" css={wrapper}>
      <Box css={{ width: '1140px', display: 'flex', flexDirection: 'column' }}>
        <TextField
          css={titleInput}
          value={archive.title}
          placeholder="제목을 입력해주세요."
          multiline={true}
          onChange={onTitleChange}
        />
        <Box css={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user.id === channel.adminId && (
            <FormControlLabel
              control={
                <Checkbox
                  value={archive.status === 'Notice'}
                  css={checkBox}
                  onChange={onIsNoticeChange}
                />
              }
              label="공지로 설정"
            />
          )}
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
            height="calc(100vh - 215px)"
            useCommandShortcut={true}
            customHTMLRenderer={editorConfig.renderer}
            hooks={{ addImageBlobHook: imageHook }}
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
    </Grid>
  );
};

const wrapper = css`
  margin-top: 8.4375rem;
  background-color: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
  padding-bottom: 6rem;
  font-size: 30px;
`;

const titleInput = css`
  height: fit-content;
  min-height: 70px;
  textarea {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 34px;
    line-height: 50px;
  }
  margin-top: 30px;
`;

const checkBox = css`
  &.Mui-checked {
    color: ${palette.orange};
  }
`;

const submitBtn = css`
  margin: 20px 0 20px 0;
  width: 100px;
  height: 40px;
  border-radius: 50px;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
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
