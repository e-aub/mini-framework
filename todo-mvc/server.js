const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const url = req.url;

  // Static routes
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(fs.readFileSync('./index.html', 'utf-8'));
  }
  if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(fs.readFileSync('./about.html', 'utf-8'));
  }
  if (url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(fs.readFileSync('./contact.html', 'utf-8'));
  }

  // Dynamic serving for /src/ and /core/
  if (url.startsWith('/src/')) {
    const filePath = path.join(__dirname, url);
    return serveStaticFile(filePath, res);
  }

  if (url.startsWith('/core/')) {
    const filePath = path.join(__dirname, url);
    return serveStaticFile(filePath, res);
  }

  // If not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

// Helper to serve static files with proper MIME type
function serveStaticFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('File not found');
    }
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
