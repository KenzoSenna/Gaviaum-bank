document.getElementById('cadastro').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === data.email)) {
    alert('Email já cadastrado');
    return;
  }
  users.push({ id: Date.now(), nome: data.nome, email: data.email, senha: data.senha, cpf: data.cpf, saldo: 0 });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Cadastro realizado');
  window.location.href = '/login';
});