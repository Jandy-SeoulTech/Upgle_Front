/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as DefaultImage } from '../../lib/assets/defaultImage.svg';
import { ReactComponent as CancelImage } from '../../lib/assets/cancelImage.svg';
import ImageUploading from 'react-images-uploading';
import React from 'react';
import { Box } from '@material-ui/core';

const UploadImage = ({ images, uploadImage, initializeImage }) => {
  const onChange = (imageList) => {
    if (imageList.length === 0) return;
    const formData = new FormData();
    formData.append('files', imageList[0].file);
    uploadImage(formData);
  };

  return (
    <Box css={uploadImageWrapper}>
      <ImageUploading onChange={onChange}>
        {({ onImageUpload, isDragging, dragProps }) => (
          <>
            <div
              {...dragProps}
              onClick={onImageUpload}
              css={[
                dragSenser,
                isDragging &&
                  css`
                    background-color: rgba(0, 0, 0, 0.3);
                  `,
              ]}
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
    </Box>
  );
};

const uploadImageWrapper = css`
  width: 11.25rem;
  height: 11.25rem;
`;

const dragSenser = css`
  width: 11rem;
  height: 11rem;
  margin-top: 0.125rem;
  margin-left: 0.125rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  :hover {
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
