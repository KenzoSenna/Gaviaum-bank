const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

// rota de ações

app.get('/saque', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/saque.html'));
})

app.get('/deposito', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/deposito.html'));
})

app.get('/transferencia', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/transferencia.html'));
})

// rota de páginas principais

app.get('/banco', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/banco.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/cadastro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/login.html'))
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});