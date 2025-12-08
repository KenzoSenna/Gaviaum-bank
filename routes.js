// routes.js (versão simples)
const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PUBLIC = path.join(process.cwd(), 'public');
// const DATA_FILE = path.join(process.cwd(), 'data', 'futuros_clientes.json');

// app.use(express.json()); // para receber JSON do fetch()
app.use(express.static(PUBLIC)); // serve /js/, /images/, /index.html etc.

/* ---------- helpers simples para persistência em arquivo ---------- */
// async function readUsers() {
//   const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
//   return JSON.parse(raw);
// }
// async function writeUsers(users) {
//   await fs.mkdir(path.dirname(DATA_FILE), { recursive: true }).catch(()=>{});
//   await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
// }
// // API de registro de usuário na pasta Data
// app.post('/api/register', async (req, res) => {
//   try {
//     const { nome, email, senha, cpf } = req.body;
//     if (!email || !senha || !nome) return res.status(400).json({ error: 'Campos obrigatórios faltando' });

//     const users = await readUsers();
//     if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email já cadastrado' });

//     const novo = { id: Date.now(), nome, email, senha, cpf, saldo: 0, movimentacoes: [] };
//     users.push(novo);
//     await writeUsers(users);
//     return res.status(201).json({ id: novo.id });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Erro interno' });
//   }
// });

// // login (POST /api/login) 
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, senha } = req.body;
//     if (!email || !senha) return res.status(400).json({ error: 'Campos obrigatórios faltando' });

//     const users = await readUsers();
//     const user = users.find(u => u.email === email && u.senha === senha);
//     if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

//     return res.json({ success: true, userId: user.id });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Erro interno' });
//   }
// });

app.get('/', (req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));
app.get('/saque', (req, res) => res.sendFile(path.join(PUBLIC, 'saque.html')));
app.get('/deposito', (req, res) => res.sendFile(path.join(PUBLIC, 'deposito.html')));
app.get('/transferencia', (req, res) => res.sendFile(path.join(PUBLIC, 'transferencia.html')));
app.get('/banco', (req, res) => res.sendFile(path.join(PUBLIC, 'banco.html')));
app.get('/cadastro', (req, res) => res.sendFile(path.join(PUBLIC, 'cadastro.html')));
app.get('/login', (req, res) => res.sendFile(path.join(PUBLIC, 'login.html')));

/* ---------- start server ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
