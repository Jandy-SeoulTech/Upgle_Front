import React, { useState } from 'react';
import TextField from './TextField';

const TagInput = ({ tagList, onCreate, ...props }) => {
  const [input, setInput] = useState('');
  const [lengthError, setLengthError] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 10) {
      setLengthError(true);
      return;
    }
    setLengthError(false);
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  const handleCreate = () => {
    const trimmedInput = input.trim();
    if (trimmedInput.length > 0 && trimmedInput.length <= 10 && tagList.length < 10) {
      onCreate(trimmedInput);
      setInput('');
      setLengthError(false);
    }
  };

  return (
    <TextField
      placeholder="최대 10개까지 입력해주세요"
      value={input}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      error={tagList.length >= 10 || lengthError}
      helperText={
        tagList.length >= 10
          ? '더이상 추가할 수 없습니다.'
          : lengthError && '10자 이내로 입력해주세요'
      }
      {...props}
    />
  );
};

export default TagInput;
