// The beginning of the code blaster
// import v4 from 'uuid';

// let myuuid = uuidv4();

class Agencia{

}

class Cliente{
    // id
    nome
    email
    senha
    cpf
    cep
    saldo = 0
    movimentacoes = []

    constructor (nome, saldo, cpf, email, senha, cep){
        this.nome = nome
        this.saldo = saldo
        this.cpf = this.validaCPF(cpf)
        this.cep = this.validarcep(cep)
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

    for (i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false

    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false

    return cpf
    }

    async validarcep(cepe) {
        try {
            const response = await fetch(`viacep.com.br/ws/${cepe}/json/`);
            const cep = await response.json();
            if (cep.logradouro){
                return cepe
            }
            else{
                return false
            }
        } catch (error) {
            throw new Error(`Erro ao validar CEP: ${error}`);
        }
    }

    saque(valor){
        return this.saldo -= valor  
    }

    deposito(valor){
        return this.saldo += valor
    }

    transferencia(valor, pessoa2){
        try{
            if (pessoa2.nome){
                this.saldo -= valor
                pessoa2.saldo += valor
        
                return `novo saldo: ${this.saldo}, valor enviado para ${pessoa2.nome}: ${valor}, Saldo novo de ${pessoa2.nome}: ${pessoa2.saldo}`
            }  
        }
        catch (error){
            throw new Error(`talvez a pessoa na qual quer enviar o dinheiro não exista. Erro: ${error}`)
        }
        
    }

    

}

let headson = new Cliente("headson", 110)
let kenzo = new Cliente("kenzo", 120)
kenzo.saque(100)
console.log(kenzo.saldo)
console.log(kenzo.transferencia(10, headson))