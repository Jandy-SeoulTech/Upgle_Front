/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react';
import TextField from '../common/TextField';
const ChannerPostEdit = ({ }) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

  return (
    <Grid container>
      <Grid item>
        <TextField>
          
        </TextField>

      </Grid>
      <Grid item>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => { }}
        />
      </Grid>
    </Grid>
  );
};

const channerHomeWrapper = css`
  margin-top: 3.75rem;
  margin-bottom: 10rem;
  height: 30rem;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
`;

const talkWrapper = css`
  height: fit-content;
  background: rgba(0, 0, 0, 0.1);
`;

const boardWrapper = css`
  height: 30%;
  background: rgba(0, 0, 0, 0.1);
`;

const chatWrapper = css`
  height: 20%;
  background: rgba(0, 0, 0, 0.1);
`;

const collectWrapper = css`
  height: 32%;
  background: rgba(0, 0, 0, 0.1);
`;

export default ChannerHome;
