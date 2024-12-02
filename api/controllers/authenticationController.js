const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const createdUser = await User.create({username, password})
        jwt.sign({userId: createdUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Error generating authentication token.' });
        }
        res.cookie('token', token).status(201).json('ok');
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: errorMessages.join(' ') });
        }
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        res.status(500).json({ error: 'Error registering user.'})
    }
};