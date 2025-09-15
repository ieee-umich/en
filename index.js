const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

let scores = { user1: 0 };

app.get('/score/:user', (req, res) => {
  const user = req.params.user;
  res.json({ user, score: scores[user] || 0 });
});

app.post('/score/:user', (req, res) => {
  const user = req.params.user;
  const points = req.body.points || 0;
  scores[user] = (scores[user] || 0) + points;
  res.json({ user, score: scores[user] });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});