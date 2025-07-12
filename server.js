require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const posts = [
  {
    username: 'Raju',
    title: 'title1',
  },
  {
    username: 'James',
    title: 'title2',
  },
];

app.get('/posts', authendicateToken, (req, res) => {
  console.log(`User name :  ${JSON.stringify(req.user)}`);
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authendicateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  //  authorization format   : Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
  });
  next();
}
app.listen(3000, () => {
  console.log('Posts Service is running on:   http://localhost:3000');
});
