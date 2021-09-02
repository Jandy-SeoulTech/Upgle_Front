/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import { TextArea } from '../TextField';

const Introduce = ({ introduce, handleChangeFiled }) => {
  const handleCahnge = (input) => {
    handleChangeFiled({
      key: 'introduce',
      value: input,
    });
  };
  return (
    <>
      <Typography css={title}>간단하게 자신에 대해 소개해주세요</Typography>
      <TextArea autoFocus input={introduce} onChange={handleCahnge} />
    </>
  );
};

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  span {
    color: ${palette.orange};
  }
`;

export default Introduce;
