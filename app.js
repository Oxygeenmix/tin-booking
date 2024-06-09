// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs');

// Route to display all bookings
app.get('/', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) throw err;
        res.render('index', { bookings: results });
    });
});

// Route to display add booking form
app.get('/add', (req, res) => {
    res.render('add');
});

// Route to handle booking addition
app.post('/add', (req, res) => {
    const { name, publisher, quantity } = req.body;
    db.query('INSERT INTO bookings (name, publisher, quantity) VALUES (?, ?, ?)', [name, publisher, quantity], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Route to display edit booking form
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM bookings WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('edit', { booking: results[0] });
    });
});

// Route to handle booking update
app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, publisher, quantity } = req.body;
    db.query('UPDATE bookings SET name = ?, publisher = ?, quantity = ? WHERE id = ?', [name, publisher, quantity, id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Route to handle booking deletion
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM bookings WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
