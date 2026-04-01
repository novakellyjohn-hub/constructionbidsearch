// Simple API proxy for Vercel
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { path = [] } = req.query;
    const pathStr = Array.isArray(path) ? path.join('/') : path;
    
    // Build full URL
    const backendUrl = `http://147.182.179.47:3000/api/${pathStr}`;
    const fullUrl = new URL(backendUrl);
    
    // Add query params
    Object.keys(req.query).forEach(key => {
      if (key !== 'path') {
        fullUrl.searchParams.append(key, req.query[key]);
      }
    });

    console.log(`Proxying ${req.method} ${fullUrl.toString()}`);

    const response = await fetch(fullUrl.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
