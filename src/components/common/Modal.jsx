/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button as MuiButton, Grid } from '@material-ui/core';
import ReactModal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

function Modal({ isOpen, setIsModalOpen, tabs, currentTab, setCurrentTab }) {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: { backgroundColor: '#000000B2', marginTop: '4.0625rem' },
        content: {
          maxWidth: '960px',
          height: '80vh',
          margin: 'auto',
          padding: '0',
          borderRadius: '10px',
        },
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
    >
      <Grid container>
        <Grid
          item
          container
          sx={12}
          justifyContent="space-between"
          borderBottom="1px solid #7B7B7B"
        >
          <Grid
            item
            container
            justifyContent="space-around"
            width="fit-content"
          >
            {tabs.map((tab) => (
              <MuiButton
                key={tab.key}
                className={currentTab === tab.key ? 'selected' : ''}
                css={tabButton}
                onClick={() => {
                  setCurrentTab(tab.key);
                }}
              >
                {tab.name}
              </MuiButton>
            ))}
          </Grid>
          <Grid item>
            <CloseIcon
              css={closeButton}
              fontSize="medium"
              onClick={() => setIsModalOpen(false)}
            />
          </Grid>
        </Grid>
        <Grid item sx={12}>
          {currentTab}
        </Grid>
      </Grid>
    </ReactModal>
  );
}

const tabButton = css`
  font-size: 18px;
  font-weight: 700;
  color: black;
  padding: 10px 20px;
  &:hover,
  &.selected {
    color: #ff511b;
  }
`;

const closeButton = css`
  cursor: pointer;
  margin: 10px;
  color: #7b7b7b;
`;

export default Modal;
