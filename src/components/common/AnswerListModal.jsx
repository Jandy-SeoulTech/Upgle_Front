/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Avatar, Box, Checkbox, Grid, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Button from './Button';

const AnswerListModal = ({ tempList, onCheckChange, setOpen, onBefore, handleSuccess }) => {
  return (
    <Box css={RoomListModalWrapper}>
      <Box
        css={{
          padding: '1.1875rem 1.875rem',
          fontSize: '1.125rem',
          fontFamily: 'Noto Sans KR',
          fontWeight: '700',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        채팅 내용 선택
        <ClearIcon
          css={{ cursor: 'pointer' }}
          onClick={() => {
            setOpen(false);
          }}
        />
      </Box>
      <Box css={{ padding: '1.875rem', height: '500px', overflow: 'auto' }}>
        <Box
          css={{
            textAlign: 'center',
            fontSize: '.875rem',
            fontFamily: 'Noto Sans KR',
            marginTop: '1.875rem',
            marginBottom: '1.25rem',
          }}
        >
          선택한 채팅방에서 불러운 질문과 그에 대한 답변입니다. 글을 작성할 때 사용할 내용들을
          선택해주세요
        </Box>
        {console.log(tempList)}
        {tempList.map((question) => (
          <Box css={messagesWrapper}>
            <Checkbox
              checked={question.checked}
              css={checkBox}
              onClick={() => {
                onCheckChange(question.id);
              }}
            />
            <Box css={{ flex: 1 }}>
              <Box css={message(false)}>{question.content}</Box>
              {question.answeringMessage.map((answer) => (
                <Box css={message(true)}>{answer.content}</Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        css={{
          padding: '1.25rem 1.875rem',
          fontSize: '1.125rem',
          fontFamily: 'Noto Sans KR',
          fontWeight: '700',
          boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.25)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {onBefore ? <Button onClick={onBefore}>뒤로</Button> : <div></div>}
        <Button onClick={handleSuccess}>계속</Button>
      </Box>
    </Box>
  );
};

export default AnswerListModal;

const RoomListModalWrapper = css`
  width: 50rem;
  height: 40rem;
  background-color: white;
  z-index: 999;
  border-radius: 10px;
`;

const messagesWrapper = css`
  display: flex;
  align-items: flex-start;
  margin-top: 2.5rem;
`;

const checkBox = css`
  padding: 2px 0 0 0;
  margin-right: 30px;
`;

const message = (isAnswer) => css`
  padding: 0.625rem 1.25rem;
  font-family: 'Noto Sans KR';
  font-size: 0.75rem;
  border-radius: 10px;
  margin-top: ${isAnswer && '.9375rem'};
  color: ${isAnswer ? '#474747' : '#FFF'};
  background-color: ${isAnswer ? '#F0F0F0' : '#474747'};
`;
