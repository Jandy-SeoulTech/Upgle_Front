import { Modal as MuiModal } from '@material-ui/core';
import React from 'react';

export default function Modal({ children, open, setOpen }) {
  return (
    <MuiModal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </MuiModal>
  );
}
