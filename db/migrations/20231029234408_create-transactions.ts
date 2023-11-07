import { Knex } from 'knex'

//MÉTODO UP: mostra o que a migration irá fazer

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary() //chave primária
    table.text('title').notNullable() //notnUllable significa q esse campo n pode ficar vazio
    table.decimal('amount', 10, 2).notNullable() //quantidades tamanho do nunero e casa decimais.
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable() // mostra a data de criação de cada registro
  })
}
//MÉTODO DOWN: se precisar um collback, desfazer o que o metodo UP fez. 
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

/*
MIGRATIONS: CONTROLE DE VERSÃO DENTRO DO BANCO DE DADOS.
Histórico de todas as mudanças feitas no banco de dados. 
Tabela criada automaticamente
Não podem ser excluidas, mas pra serem editadas usa-se: 
npm run knex -- migrate:rollback




*/