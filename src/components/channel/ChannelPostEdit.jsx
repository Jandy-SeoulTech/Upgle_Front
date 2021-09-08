/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Checkbox, FormControlLabel, Typography} from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import { TextField } from '../TextField';
import Button from './../common/Button';
import palette from '../../lib/styles/palette';

const ChannelPostEdit = ({ channel, user}) => {

  return (
    <Grid container justifyContent="center" css={channelPostEditWrapper}>
      <Box css={{ width: '1140px', display: 'flex', flexDirection: 'column'}}>
        <TextField
          css={title}
          placeholder="제목을 입력해주세요."
          multiline='true'
        />
        <Box css={{display: 'flex', justifyContent: 'flex-end'}}>
          {user.id === channel.adminId &&
            <div css={checkBoxCss}>
              <Checkbox />
              <Typography>공지로 설정</Typography>
            </div>
          }
        </Box>
        <Box css={editor}>
          <Editor
            language="ko"
            initialValue="재능 공유 요청/제안을 작성해주세요."
            previewStyle="vertical"
            initialEditType="wysiwyg"
            height="100%"
            useCommandShortcut={true}
          />
        </Box>
        <Grid container justifyContent='flex-end'>
          <Button css={submit}>작성 완료</Button>
        </Grid>

      </Box>
    </Grid>
  );
};



const channelPostEditWrapper = css`
  margin-top: 135px;
  background-color: #FAFAFC;
  font-size: 30px;
`;

const title = css`
  height: fit-content;
  min-height: 70px;
  width: 1140px;
  textarea {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 34px;
    line-height: 50px;
  }
  margin-top: 30px;
`;

const checkBoxCss = css`
  display: flex;
  align-items: center;
  height: 30px;
  & .MuiCheckbox-root {
    width: 20px;
    height: 20px;
    color: ${palette.orange};
  }
  & .Mui-checked {
    color: ${palette.orange};
  }
  p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 18px;
    margin-left: 15px;

  }
`;

const editor = css`
  height: calc(100vh - 215px);
  margin-top: 30px;
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

const submit = css`
  margin: 20px 0 20px 0;
  width: 100px;
  height: 40px;
  border-radius: 50px;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  background: #000000;
  color: #FFFFFF;
`;


export default ChannelPostEdit;
