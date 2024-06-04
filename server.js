const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let points = 5000;

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const calculateResult = (betAmount, betType, diceTotal) => {
  let winAmount = 0;

  if (diceTotal < 7 && betType === '7down') {
    winAmount = betAmount * 2;
  } else if (diceTotal > 7 && betType === '7up') {
    winAmount = betAmount * 2;
  } else if (diceTotal === 7 && betType === 'lucky7') {
    winAmount = betAmount * 5;
  } else {
    winAmount = -betAmount;
  }

  points += winAmount;
  return { winAmount, points };
};

app.post('/roll', (req, res) => {
  const { betAmount, betType } = req.body;
  const dice1 = rollDice();
  const dice2 = rollDice();
  const diceTotal = dice1 + dice2;
  const result = calculateResult(betAmount, betType, diceTotal);
  
  res.json({ dice1, dice2, ...result });
});

app.get('/points', (req, res) => {
  res.json({ points });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
