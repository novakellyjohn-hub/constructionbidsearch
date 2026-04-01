// Vercel catch-all API proxy
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
    const { path } = req.query;
    const pathString = Array.isArray(path) ? path.join('/') : path;
    const queryString = new URLSearchParams(req.query).toString();
    
    const url = `${BACKEND_URL}/${pathString}${queryString ? '?' + queryString : ''}`;

    let response;
    switch (req.method) {
      case 'GET':
        response = await axios.get(url);
        break;
      case 'POST':
        response = await axios.post(url, req.body);
        break;
      case 'PUT':
        response = await axios.put(url, req.body);
        break;
      case 'DELETE':
        response = await axios.delete(url);
        break;
      default:
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.message || 'API request failed',
      details: error.response?.data
    });
  }
}
