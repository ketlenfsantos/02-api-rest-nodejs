//AQUI CONSTA TUDO SOBRE BANCO DE DADOS

import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENTE,  //opção obrigatória: qual banco de dados estamos utilizando
  connection: //opção obrigatória: informações sobre conexão (nome do arquivo que ta os dados)
   env.DATABASE_CLIENTE == "sqlite" 
   ?  {
    filename: env.DATABASE_URL, 
  }                
  : env.DATABASE_URL,   
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)



