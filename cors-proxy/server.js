const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Use CORS to allow requests from your frontend
app.use(cors());

// Proxy requests to the Klozer API
app.use('/api/portal', createProxyMiddleware({
    target: 'https://portal.klozer.io',
    changeOrigin: true,
    pathRewrite: {
        '^/api/portal': ''  // Remove the '/api/portal' prefix
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add Authorization header here
        proxyReq.setHeader('Authorization', 'Bearer office@klozer.io:14Klozer#786');  // Replace with your actual token
    }
}));

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});
