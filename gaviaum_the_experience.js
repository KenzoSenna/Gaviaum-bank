// The beginning of the code blaster
// import v4 from 'uuid';

// let myuuid = uuidv4();

class Agencia{

}

class Cliente{
    // id
    nome
    saldo = 0
    movimentacoes = []

    constructor(nome, saldo){
        this.nome = nome
        this.saldo = saldo
        // this.id = sla
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