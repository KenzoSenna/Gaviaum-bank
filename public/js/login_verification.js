document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const { email, senha } = Object.fromEntries(new FormData(e.target));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) return alert('Credenciais inválidas');
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/banco';
  });
