import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Toolbar } from '@material-ui/core';

const sections = [
  { title: '회사소개', url: '#' },
  { title: '공지사항', url: '#' },
  { title: '개인정보 처리방침', url: '#' },
  { title: '이용약관', url: 'About' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: '1rem',
        borderTop: '1.5px solid #ADB2B3',
        color: '#6F7273',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            justifyContent: 'center',
            overflowX: 'auto',
          }}
        >
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              sx={{ p: 1, flexShrink: 0, margin: '0 1rem' }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            jandy
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
