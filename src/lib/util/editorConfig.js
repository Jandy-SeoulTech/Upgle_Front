
import { uploadImages } from './../api/image';
import { css } from '@emotion/react';

const renderer = {
  question(node, context) {
    return [
      { type: 'openTag', tagName: 'div', outerNewLine: true, classNames: ['question'], },
      { type: 'html', content: node.literal, },
      { type: 'closeTag', tagName: 'div', outerNewLine: true, },
    ];
  },
  answer(node, context) {
    return [
      { type: 'openTag', tagName: 'div', outerNewLine: true, classNames: ['answer'], },
      { type: 'html', content: node.literal, },
      { type: 'closeTag', tagName: 'div', outerNewLine: true, },
    ];
  },
}
const hooks = {
  addImageBlobHook: async function (blob, callback) {
    let formData = new FormData();
    formData.append('files', blob);
    const uploadedImageUrl = await uploadImages(formData);
    callback(uploadedImageUrl, 'alt text');
  },
};

const editorCss = css`
  .toastui-editor-contents p {
    font-family: 'Barlow', 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 0.2px;
    color: #000000;
  }
  .toastui-editor-contents .question {
    border: 1px solid #7b7b7b;
    border-radius: 10px;
    background-color: #c8ff8a;
    width: 200px;
    margin-right: 0;
    margin-left: auto;
    font-size: 20px;
    font-family: 'Barlow', 'Noto Sans KR';
  }
  .toastui-editor-contents .answer {
    border: 1px solid #7b7b7b;
    border-radius: 10px;
    background-color: #8aecff;
    width: 200px;
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

export default {
  renderer,
  hooks,
  editorCss,
};