// src/components/Footer.js

import React from 'react';
import { Container, Typography } from '@mui/material';

const footer = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '20px 0', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
      <Container>
        <Typography variant="body2" color="textSecondary">
          &copy; Made by Aayushmaan Mishra for Master-O.
        </Typography>
      </Container>
    </footer>
  );
};

export default footer;
