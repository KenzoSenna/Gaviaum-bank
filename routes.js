const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/banco', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/banco.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cadastro.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});