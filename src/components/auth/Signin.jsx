import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Signin = (props) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          height: '100vh',
          background: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Grid>
      <Grid item container md={5} xs={12} p={5} alignItems="center">
        <Grid
          item
          container
          sx={{ height: 'fit-content' }}
          justifyContent="center"
        >
          <Grid item container xs={12} mb={2}>
            <Grid item container xs={2}>
              <Typography
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ID :
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item container xs={12} mb={2}>
            <Grid item container xs={2}>
              <Typography
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                PW :
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField size="small" fullWidth></TextField>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Button variant="contained" fullWidth>
              Signin
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Typography textAlign="center" mt={1} sx={{ color: '#414CD9' }}>
              <Link to="/signup">you don't have any account?</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
