// The beginning of the code blaster
// import v4 from 'uuid';

// let myuuid = uuidv4();
class Agencia{
    
}

class Cliente{
    nome
    email
    senha
    cpf
    cep
    saldo = 0
    movimentacoes = []

    constructor (nome, saldo, cpf = null, cep, email = null, senha = null){
        this.nome = nome
        this.saldo = saldo
        this.cpf = this.validaCPF(cpf)
        this.cep = cep // Set raw value; validate asynchronously after construction
        this.email = email
        this.senha = senha
    }

    validaCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')
    
    if (strCPF.length !== 11)
        return false
    
    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        ].indexOf(strCPF) !== -1)
        return false

    for ( let i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false

    Soma = 0

    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false

    return cpf
    }

    async validarcep(cep) {
        try {
            const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data){
                return cep
            }
            else{
                return false
            }
        } catch (error) {
            throw new Error(`Erro ao validar CEP: ${error}`);
        }
    }

    saque(valor){
        let tipo = 'Saque'
        try{
            if (isNaN(valor) || valor <= 0) {
                throw new Error('Valor inválido para saque')
            }
            if (valor > this.saldo){
                throw new Error('Saldo insuficiente para saque')
            }
            else{
                this.saldo -= valor
                this.movimentacoes.push(new Transacao(tipo, valor))
            }
        }

        catch (error){
            throw new Error(`Erro ao realizar saque: ${error}`);
        }
    }

    deposito(valor){
        let tipo = 'Depósito'
        try{
            if (isNaN(valor) || valor <= 0) {
                throw new Error('Valor inválido para depósito')
            }
            else{
                this.saldo += valor
                this.movimentacoes.push(new Transacao(tipo, valor))
            }
        }
        catch (error){
            throw new Error(`Erro ao realizar depósito: ${error}`);
        }
    }

    transferencia(valor, pessoa2){
        let tipo = 'transferencia'
        try{
            if (pessoa2.nome){
                this.saldo -= valor
                pessoa2.saldo += valor
                this.movimentacoes.push(new Transacao(tipo, valor))
                return (`novo saldo: ${this.saldo}, valor enviado para ${pessoa2.nome}: ${valor}, Saldo novo de ${pessoa2.nome}: ${pessoa2.saldo}`)
            }  
        }
        catch (error){
            throw new Error(`talvez a pessoa na qual quer enviar o dinheiro não exista. Erro: ${error}`)
        }
        
    }

}

class Transacao{
    id_transaction
    timeStamp
    tipo
    valor

    static contador = 0

    constructor (tipo, valor){

        this.id_transaction = ++Transacao.contador
        this.timeStamp = new Date()
        this.tipo = tipo
        this.valor = valor

    }
    

}

function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function loadCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}
function saveCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  // também atualiza o array users para persistir mudanças
  const users = loadUsers();
  const i = users.findIndex(u => u.cpf === user.cpf || u.email === user.email); // Ambos são atributos únicos, coloquei como se fossem ID's
  if (i >= 0) {
    users[i] = { ...users[i], ...user }; // sobrescreve campos (saldo, movimentacoes etc)
    saveUsers(users);
  }
}

// Funções de hidratação e desidratação (usar um localStorage e transforma-lo em objeto Cliente e vice-versa)
// Isso indica qq na verdade, estamos serializando no json, mas por ter aprendido como hidratar e desidratar, ficou assim

function hidratarUser(local_storage_descompactado) {
  const c = new Cliente(local_storage_descompactado.nome, local_storage_descompactado.saldo, local_storage_descompactado.cpf, local_storage_descompactado.cep, local_storage_descompactado.email, local_storage_descompactado.senha);
  c.movimentacoes = Array.isArray(local_storage_descompactado.movimentacoes)
    ? local_storage_descompactado.movimentacoes.map(m => {
        const t = new Transacao(m.tipo, m.valor);
        t.id_transaction = m.id_transaction;
        t.timeStamp = m.timeStamp ? new Date(m.timeStamp) : new Date();
        return t;
      })
    : [];
  return c;
}

function desidratarUser(cliente) {
  return {
    nome: cliente.nome, email: cliente.email, cpf: cliente.cpf,
    cep: cliente.cep, saldo: cliente.saldo, senha: cliente.senha,
    movimentacoes: cliente.movimentacoes
  };
}

function userDeposito(valor){
    const user_atual = hidratarUser(loadCurrentUser())
    try{
        user_atual.deposito(valor)
        const userDesidratado = desidratarUser(user_atual)
        saveCurrentUser(userDesidratado)
    }
    catch (err){
        alert (err.message)
    }
    
}

function userSaque(valor){
    const user_atual = hidratarUser(loadCurrentUser())
    try{
        user_atual.saque(valor)
        const userDesidratado = desidratarUser(user_atual)
        saveCurrentUser(userDesidratado)
    }
    catch (err){
        alert (err.message)
    }
}   

function userTransferencia(valor, pessoa2_cpf){
    const user_atual = hidratarUser(loadCurrentUser())
    const destinatario = loadUsers()
    user_atual.transferencia(valor, destinatario)
    const users = loadUsers()
    const i = users.findIndex(u => u.cpf === pessoa2_cpf);

    
    if (i >= 0) {
        user_atual.transferencia(valor, pessoa2_cpf)
        users[i] = { ...users[i], ...user_atual }; // sobrescreve campos (saldo, movimentacoes etc)
        saveUsers(users);
        const userDesidratado = desidratarUser(user_atual)
        saveCurrentUser(userDesidratado)
    }
}

// Sim, eu desisti de modularizar tudo isso.
// Depósito

document.getElementById('deposito').addEventListener('submit', (e) => {
    e.preventDefault();

    const { valor } = Object.fromEntries(new FormData(e.target));
    const numValor = Number(valor);
    if (isNaN(numValor) || numValor <= 0) {
        alert('Por favor, insira um valor numérico positivo para depósito.');
        return;
    }
    userDeposito(numValor);

})

// saque

document.getElementById('saque').addEventListener('submit', (e) => {
    e.preventDefault();
    const { valor } = Object.fromEntries(new FormData(e.target));
    const numValor = Number(valor);
    if (isNaN(numValor) || numValor <= 0) {
        alert('Por favor, insira um valor numérico positivo para saque.');
        return;
    }
    userSaque(numValor);
})

// transferencia

document.getElementById('transferencia').addEventListener('submit', (e) => {
    e.preventDefault();
    const { valor, cpf_destino } = Object.fromEntries(new FormData(e.target));
    const numValor = Number(valor);
    if (isNaN(numValor) || numValor <= 0) {
        alert('Por favor, insira um valor numérico positivo para transferência.');
        return;
    }
    userTransferencia(numValor, cpf_destino);
})