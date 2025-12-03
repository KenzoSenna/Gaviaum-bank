const express = require('express');
const app = express();

// GET request to the root path
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.get('/banco', (req, res) => {
    res.render('banco')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});