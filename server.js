require('dotenv').config() // Load .env file

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors'); 
app.use(cors({ // Allow cross-origin requests
    origin: 'http://localhost:3001' 
  }));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }) // Connect to DB using URL from .env file
const db = mongoose.connection

db.once('open', () =>  // Once connection is open, log to console
console.log('Connected!!')
)

db.on('error', (error) => // If there is an error on connection, log to console
console.error(error)
)

app.use(express.json()) // Parse JSON bodies on incoming requests

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


const PORT = 3000
app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
);