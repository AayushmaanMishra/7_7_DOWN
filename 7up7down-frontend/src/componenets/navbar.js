// src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">7 UP 7 DOWN Game</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default navbar;
