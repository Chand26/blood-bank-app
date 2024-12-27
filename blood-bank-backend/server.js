const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// CRUD Operations

// Get all donors
app.get('/api/donors', (req, res) => {
    db.query('SELECT * FROM Donors', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Get a single donor by ID
app.get('/api/donors/:id', (req, res) => {
    const donorId = req.params.id;
    db.query('SELECT * FROM Donors WHERE donor_id = ?', [donorId], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.json(result[0]);
    });
});

// Add a new donor
app.post('/api/donors', (req, res) => {
    const { name, contact_info, blood_type, donation_date } = req.body;
    const sql = 'INSERT INTO Donors (name, contact_info, blood_type, donation_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, contact_info, blood_type, donation_date], (err, result) => {
        if (err) {
            console.error('Error adding new donor:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ donor_id: result.insertId });
    });
});

// Update a donor
app.put('/api/donors/:id', (req, res) => {
    const { id } = req.params;
    const { name, contact_info, blood_type, donation_date } = req.body;
    const sql = 'UPDATE Donors SET name = ?, contact_info = ?, blood_type = ?, donation_date = ? WHERE donor_id = ?';
    db.query(sql, [name, contact_info, blood_type, donation_date, id], (err, result) => {
        if (err) {
            console.error('Error updating donor:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Donor updated successfully' });
    });
});

// Delete a donor
app.delete('/api/donors/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Donors WHERE donor_id = ?', [id], (err, _result) => {
        if (err) {
            console.error('Error deleting donor:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(204).send();
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
