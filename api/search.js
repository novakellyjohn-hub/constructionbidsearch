// Vercel serverless function - proxy API calls to droplet
const axios = require('axios');

const BACKEND_URL = 'http://147.182.179.47:3000/api';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Get query string
    const queryString = Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&');
    const url = `${BACKEND_URL}/search${queryString ? '?' + queryString : ''}`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'API request failed' });
  }
}
