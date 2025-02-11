const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const users = require('./routes/users');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/users', users);

app.listen(8000, ()=>{
    console.log('Running on port 8000')
});