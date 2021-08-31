/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import { ReactComponent as DefaultImage } from '../../lib/assets/defaultImage.svg';
import { ReactComponent as CancelImage } from '../../lib/assets/cancelImage.svg';
import ImageUploading from 'react-images-uploading';

const UploadImage = ({ images, uploadImage, initializeImage }) => {
  const onChange = (imageList) => {
    if (imageList.length === 0) return;
    const formData = new FormData();
    formData.append('files', imageList[0].file);
    uploadImage(formData);
  };

  return (
    <Box css={UploadWellTalentWrapper}>
      <Typography css={title}>
        자신을 드러내는 프로필 사진을 등록해주세요
      </Typography>

      <ImageUploading onChange={onChange}>
        {({ onImageUpload, isDragging, dragProps }) => (
          <>
            <div
              {...dragProps}
              onClick={onImageUpload}
              css={dragSenser(isDragging)}
            ></div>
            {images.length === 0 ? (
              <DefaultImage css={currentImage} />
            ) : (
              <img src={images[0]} alt="" css={currentImage} />
            )}
            <CancelImage css={cancelImage} onClick={initializeImage} />
          </>
        )}
      </ImageUploading>

      <Typography css={description}>
        등록하지 않으면 기본이미지로 설정됩니다.
      </Typography>
    </Box>
  );
};

const UploadWellTalentWrapper = css`
  display: flex;
  flex-direction: column;
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
`;

const dragSenser = (isDragging) => css`
  margin-top: 5.38rem;
  margin-left: 6.05rem;
  width: 11rem;
  height: 11rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${isDragging && 'rgba(0, 0, 0, 0.3)'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const currentImage = css`
  margin-top: 3.375rem;
  margin-left: 5.9375rem;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
`;

const cancelImage = css`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  top: -3rem;
  margin-left: 14.125rem;
  cursor: pointer;
`;

const description = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.8125rem;
  font-weight: 500;
  margin-left: 4.3rem;
`;

export default UploadImage;
