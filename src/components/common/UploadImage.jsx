/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box } from '@material-ui/core';
import { ReactComponent as DefaultImage } from '../../lib/assets/defaultImage.svg';
import { ReactComponent as CancelImage } from '../../lib/assets/cancelImage.svg';
import ImageUploading from 'react-images-uploading';

const UploadImage = ({ profileImage, onUploadProfileImage, onInitImage }) => {
  const onChange = (imageList) => {
    if (imageList.length === 0) return;
    const formData = new FormData();
    formData.append('files', imageList[0].file);
    onUploadProfileImage(formData);
  };

  return (
    <Box css={uploadImageWrapper}>
      <ImageUploading onChange={onChange}>
        {({ onImageUpload, isDragging, dragProps }) => (
          <>
            <div {...dragProps} onClick={onImageUpload} css={dragSenser(isDragging)}></div>
            {!profileImage ? (
              <DefaultImage css={currentImage} />
            ) : (
              <img src={profileImage} alt="" css={currentImage} />
            )}
            <CancelImage css={cancelImage} onClick={onInitImage} />
          </>
        )}
      </ImageUploading>
    </Box>
  );
};

const uploadImageWrapper = css`
  width: 11.25rem;
  height: 11.25rem;
`;

const dragSenser = (isDragging) => css`
  margin-top: 5.38rem;
  margin-left: 6.05rem;
  width: 11rem;
  height: 11rem;
  margin-top: 0.125rem;
  margin-left: 0.125rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${isDragging && 'rgba(0, 0, 0, 0.3)'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const currentImage = css`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
`;

const cancelImage = css`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  top: -3.3rem;
  left: 8.1rem;
  cursor: pointer;
`;

export default UploadImage;
