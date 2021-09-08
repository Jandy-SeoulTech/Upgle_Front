/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid } from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import { TextField } from '../TextField';
import Button from './../common/Button';

const ChannelPostEdit = ({ }) => {

  return (
    <Grid container justifyContent="center" alignItems="flex-start" css={channelPostEditWrapper}>
      <Box css={{ width: '1200px', height: '100%' }}>
        <Grid>
          <TextField
            css={title}
            placeholder="제목을 입력해주세요."
          />
          <Button css={submit}>
            작성완료
          </Button>
        </Grid>


        <Box css={editor}>
          <Editor
            language="ko"
            initialValue="재능 공유 요청/제안을 작성해주세요."
            previewStyle="vertical"
            height="100%"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
          />
        </Box>

      </Box>
    </Grid>
  );
};



const channelPostEditWrapper = css`
  margin-top: 60px;
  background-color: #FAFAFC;
  font-size: 30px;
  height: calc(100vh - 60px);
`;

const title = css`
  width: calc(100% - 100px);
  height: 60px;
  input {
    font-size: 30px;
    font-family: 'Barlow', 'Noto Sans KR';
  }
  margin-top: 5px;
`;

const submit = css`
  margin: auto;
`;

const editor = css`
  height: calc(100% - 65px);
  padding: 5px;
  .toastui-editor-contents p {
    font-size: 20px;
    font-family: 'Barlow', 'Noto Sans KR';
  }
  .toastui-editor-contents::-webkit-scrollbar {
    width: 10px;
  }
  .toastui-editor-contents::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    
  }
`;



export default ChannelPostEdit;
