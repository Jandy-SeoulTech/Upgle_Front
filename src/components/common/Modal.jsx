/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Modal as MuiModal } from '@material-ui/core';
import React from 'react';

const Modal = ({ children, open, setOpen }) => (
  <MuiModal
    open={open}
    onClose={() => {
      setOpen(false);
    }}
    css={css``}
  ></MuiModal>
);

export default Modal;
