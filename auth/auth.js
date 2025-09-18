const express = require('express');
const path = require('path');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../public'))); // mainly for assets

console.log("in auth.js");

// first step: render login page
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;