const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create express server/app 
const app = express();

// Directorio publico
app.use( express.static('public') );

// cors
app.use( cors() );

// lectura y parseo del body
app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth') );

app.listen( process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
} );