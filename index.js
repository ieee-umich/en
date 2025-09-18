const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'somepassword',
    database: 'pointSys'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/pointsys', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('pointSys', { users: results });
    });
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