const express = require('express');
const app = express();
const path = require('path');
const { resolveSoa } = require('dns');

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Timestamp microservice
let responseObject = {};

app.get('/api/timestamp/:input', (req, res) => {
  let input = req.params.input;
  if (input.includes('-')) {
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  } else {
    let unix = parseInt(input);
    responseObject['unix'] = new Date(unix).getTime();
    responseObject['utc'] = new Date(unix).toUTCString();
  }

  if (!responseObject['unix'] || !responseObject['utc']) {
    responseObject = { error: 'Invalid Date' };
  }

  res.json(responseObject);
});

// Route for if user input is empty
app.get('/api/timestamp', (req, res) => {
  responseObject['unix'] = new Date().getTime();
  responseObject['utc'] = new Date().toUTCString();

  res.json(responseObject);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
