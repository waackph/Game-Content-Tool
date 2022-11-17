const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
// routes
const routes = require('./routes/api/views');

// ***
// The script starts the backend application. It instatiates the express.js backend engine, 
// connects to MongoDB and initializes the Routes.
// ***

const app = express();

// Connect DB
connectDB();

// Use the body parser (for req.body)
app.use(bodyParser.json());

// CORS
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// Use routes
app.use('/api', routes);

const port = process.env.port || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
