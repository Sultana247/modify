const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const corsAnywhere = require('cors-anywhere');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_PROXY_PORT = 3001; // Port for the CORS Anywhere server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start your Express server
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});

// Start the CORS Anywhere server
corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins, or specify a whitelist
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(CORS_PROXY_PORT, () => {
    console.log(`CORS Anywhere proxy server running on port ${CORS_PROXY_PORT}`);
});
