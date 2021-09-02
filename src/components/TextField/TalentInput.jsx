import React, { useState } from 'react';
import TextField from './TextField';

const TalentInput = ({ tallent, createTalent, ...props }) => {
  const [input, setInput] = useState('');
  const [lengthError, setLengthError] = useState(false);

  const handleCahngeTalent = (e) => {
    if (e.target.value.length > 10) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
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
      setInput('');
    }
  };

  return (
    <TextField
      {...props}
      placeholder="최대 10개까지 입력해주세요"
      value={input}
      onChange={handleCahngeTalent}
      onKeyPress={handleKeyPress}
      error={tallent.length >= 10 || lengthError}
      helperText={
        tallent.length >= 10
          ? '더이상 추가할 수 없습니다.'
          : lengthError && '10자 이내로 입력해주세요'
      }
    />
  );
};

export default TalentInput;
