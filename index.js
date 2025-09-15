const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

let users = [
  { name: "Alice", unique_name: "alice123", points: -10 },
  { name: "Bob", unique_name: "bob456", points: 0 },
  { name: "Charlie", unique_name: "charlie789", points: 20 },
  { name: "David", unique_name: "david101", points: 10 },
  { name: "Eve", unique_name: "eve202", points: 2147483647 }
];
app.get('/pointsys', (req, res) => {
    users = users.sort((a, b) => b.points - a.points);
    res.render('pointSys', { users });
});

// app.post('/score/:user', (req, res) => {
//     const user = req.params.user;
//     const points = req.body.points || 0;
//     scores[user] = (scores[user] || 0) + points;
//     res.json({ user, score: scores[user] });
// });

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});