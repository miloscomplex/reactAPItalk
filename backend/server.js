require('../dotenv').config;
// Express Server Setup
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const apiToken = process.env.API_KEY;

const PORT = 5000;
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set Cross-Origin Resource Sharing (CORS) to frontend React App
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000"
};

// Kintone API Setup
const subdomain = "drumcode"; //Enter your Kintone Subdomain (ex: devevents)
const appID = "1"; //Enter your App's ID number (ex: 1)
//Enter your App's API Token (ex: cJrAD9...)

// Append a Query Parameters to the Request Endpoint
const parameters = "query=order by recordID asc";

const multipleRecordsEndpoint = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appID}&${parameters}`

// This runs if a GET request calls for localhost:5000/getData
app.get('/getData', cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': apiToken
    }
  }
  const response = await fetch(multipleRecordsEndpoint, fetchOptions);
  const jsonResponse = await response.json();
  res.json(jsonResponse);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
