import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(import.meta.dirname, 'dist');

// Serve static files from the dist directory
app.use(express.static(distPath));

// Fallback for single-page applications (SPA) - redirect all unhandled requests to index.html
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in production mode on http://0.0.0.0:${PORT}`);
});
