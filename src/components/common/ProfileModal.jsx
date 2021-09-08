/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button as MuiButton, Grid } from '@material-ui/core';
import ReactModal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';

function ProfileModal({
  isOpen,
  setIsModalOpen,
  tabs,
  currentTab,
  setCurrentTab,
}) {
  useEffect(() => {
    tabs.find((tab) => tab.key === currentTab)?.onTab();
  }, [currentTab]);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={false}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      style={{
        overlay: { backgroundColor: '#000000B2', marginTop: '3.75rem' },
        content: {
          backgroundColor: '#fff',
          maxWidth: '800px',
          height: '80vh',
          margin: 'auto',
          padding: '0',
          borderRadius: '10px',
        },
      }}
      ariaHideApp={false}
    >
      <Grid container width="100%">
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          borderBottom="1px solid #7B7B7B"
          css={header}
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
        <Grid item xs={12} css={contents}>
          {tabs.find((tab) => tab.key === currentTab)?.data}
        </Grid>
      </Grid>
    </ReactModal>
  );
}

const header = css`
  position: fixed;
  z-index: 1;
  width: 798px;
  height: 60px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const tabButton = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
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

const contents = css`
  margin-top: 60px;
  height: fit-content;
  overflow: scroll;
`;

export default ProfileModal;
