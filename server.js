const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/slots', require('./routes/api/slots'));
app.use('/api/appointment', require('./routes/api/appointment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
