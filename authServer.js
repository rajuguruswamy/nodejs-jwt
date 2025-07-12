require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

let refreshTokens = [];

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post('/login', (req, res) => {
  // authendicate user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.delete('/logout', (req, res) => {
  console.log(req.body.token);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN);
}

app.listen(4000, () => {
  console.log('Auth Service is running on :   http://localhost:4000');
});
