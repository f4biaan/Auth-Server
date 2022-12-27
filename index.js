const express = require('express');
const cors = require('cors');

// Create express server/app 
const app = express();

// cors
app.use( cors() );

// lectura y parseo del body
app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth') );

app.listen( 4000, () => {
  console.log(`Server is running on port ${4000}`);
} );