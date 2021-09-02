import React, { useState } from 'react';
import TextField from './TextField';

const TalentInput = ({ tallent, createTalent, css, ...props }) => {
  const [input, setInput] = useState('');

  const handleCahngeTalent = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateTalent();
    }
  };

  const handleCreateTalent = () => {
    if (tallent.length < 10) {
      createTalent(input);
    }
    setInput('');
  };

  return (
    <TextField
      {...props}
      placeholder="최대 10개까지 입력해주세요"
      value={input}
      onChange={handleCahngeTalent}
      onKeyPress={handleKeyPress}
      css={css}
      error={tallent.length >= 10}
      helperText={tallent.length >= 10 && '더이상 추가할 수 없습니다.'}
    />
  );
};

export default TalentInput;
