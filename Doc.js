/**
 * Classe que representa uma agência bancária (esqueleto).
 * @class Agencia
 * @property {string} id - Identificador da agência (opcional).
 * @property {Cliente[]} clientes - Lista de clientes vinculados.
 */
class Agencia {}

/**
 * Representa um cliente do banco.
 * @class Cliente
 * @param {string} nome - Nome completo do cliente.
 * @param {number} saldo - Saldo inicial (número).
 * @param {string|null} cpf - CPF do cliente (após validação retorna string ou false).
 * @param {string|number} cep - CEP do cliente (validação assíncrona).
 * @param {string|null} email - Email do cliente.
 * @param {string|null} senha - Senha (não armazenar em texto em produção).
 *
 * @property {number} saldo - Saldo atual.
 * @property {Transacao[]} movimentacoes - Histórico de transações.
 *
 * Métodos principais:
 * - validaCPF(cpf): valida formato e dígitos do CPF; retorna cpf ou false.
 * - validarcep(cepe): consulta viaCEP; retorna cep ou lança erro.
 * - saque(valor): subtrai do saldo e registra transação.
 * - deposito(valor): soma ao saldo e registra transação.
 * - transferencia(valor, pessoa2): transfere entre clientes e registra transação.
 */
class Cliente { }

/**
 * Representa uma transação financeira.
 * @class Transacao
 * @param {string} tipo - 'Saque' | 'Depósito' | 'Transferencia'
 * @param {number} valor - Valor da transação.
 * @property {number} id_transaction - ID incremental único.
 * @property {Date} timeStamp - Data/hora da transação.
 */
class Transacao { }
