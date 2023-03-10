const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConection } = require('./db/config');
require('dotenv').config();

// Create express server/app 
const app = express();

// Database
dbConection();

// Directorio publico
app.use(express.static('public'));

// cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));

// manejar demas rutas
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});