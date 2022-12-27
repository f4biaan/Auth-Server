const express = require('express');


// Create express server/app 
const app = express();

// GET
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Todo salio bien',
    uid: 1234
  })
} );

app.listen( 4000, () => {
  console.log(`Server is running on port ${4000}`);
} );