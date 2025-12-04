const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Logging middleware (helps for debugging & later in Azure)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Home page - serves the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// API info route
app.get('/api/info', (req, res) => {
  res.json({
    message: 'This is your API working.',
    version: '1.0',
    environment: process.env.NODE_ENV || 'local'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
