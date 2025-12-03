const express = require('express');
const path = require('path');
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/banco', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/banco.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cadastro.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});