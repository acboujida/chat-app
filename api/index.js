const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
const authController = require('./controllers/authenticationController');

dotenv.config();
mongoose.connect(process.env.MONGO_STRING);

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT
}))

app.post('/register', authController.registerUser);

app.listen(9999);