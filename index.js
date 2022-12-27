const express = require('express');


// Create express server/app 
const app = express();

// rutas
app.use('/api/auth', require('./routes/auth') );

app.listen( 4000, () => {
  console.log(`Server is running on port ${4000}`);
} );