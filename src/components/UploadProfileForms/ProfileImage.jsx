/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import UploadImageContainer from '../../containers/common/UploadImageContainer';

const ProfileImage = () => {
  return (
    <>
      <Typography css={title}>
        자신을 드러내는 프로필 사진을 등록해주세요
      </Typography>
      <Box css={uploadImage}>
        <UploadImageContainer />
      </Box>

      <Typography css={description}>
        등록하지 않으면 기본이미지로 설정됩니다.
      </Typography>
    </>
  );
};

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
`;

const uploadImage = css`
  margin-top: 3.375rem;
  margin-left: 5.9375rem;
  margin-bottom: 3.4375rem;
`;

const description = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.8125rem;
  font-weight: 500;
  margin-left: 4.3rem;
`;

export default ProfileImage;
