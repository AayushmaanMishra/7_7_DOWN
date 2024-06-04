// src/App.js

import React, { useState } from 'react';
import { Container, Button, Typography, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPoints } from './redux/pointsSlice';
import Navbar from './componenets/navbar';
import Footer from './componenets/footer';

const App = () => {
  const [betAmount, setBetAmount] = useState(100);
  const [betType, setBetType] = useState('7down');
  const [diceResult, setDiceResult] = useState(null);
  const points = useSelector(state => state.points.value);
  const dispatch = useDispatch();

  const handleRollDice = async () => {
    try {
      const response = await axios.post('http://localhost:5000/roll', {
        betAmount,
        betType,
      });
      setDiceResult(response.data);
      dispatch(setPoints(response.data.points));
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  const renderDiceResult = () => {
    if (diceResult) {
      return (
        <Box mt={4}>
          <Typography variant="h6">Dice Results: {diceResult.dice1} + {diceResult.dice2} = {diceResult.dice1 + diceResult.dice2}</Typography>
          <Typography variant="h6">You {diceResult.winAmount >= 0 ? 'Won' : 'Lost'}: {Math.abs(diceResult.winAmount)}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container sx={{ textAlign: 'center', mt: 5, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>7 UP 7 DOWN Game</Typography>
        <Typography variant="h6" gutterBottom>Points: {points}</Typography>

        <Box my={3}>
          <Select value={betAmount} onChange={(e) => setBetAmount(e.target.value)}>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </Box>

        <Box my={3}>
          <Select value={betType} onChange={(e) => setBetType(e.target.value)}>
            <MenuItem value="7down">7 Down</MenuItem>
            <MenuItem value="7up">7 Up</MenuItem>
            <MenuItem value="lucky7">Lucky 7</MenuItem>
          </Select>
        </Box>

        <Button variant="contained" color="primary" onClick={handleRollDice} sx={{ mb: 3 }}>
          Roll Dice
        </Button>

        {renderDiceResult()}
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
