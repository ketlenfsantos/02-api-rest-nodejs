// arquivo d.ts (DEFINIÇÃO DE TIPOS), nao tem codigo JS somente TS
//infos de tipos que são (id,title etc) de outras bibliotecas, pq knex n automatiza isso. 

import { Knex } from 'knex'  //informa que quer usar a biblioteca knex, complementar os dados.

//INFORMA O QUE COMPÕE A TRANSACTIONS
declare module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string
            title:string
            amount: number
            created_at: string
            session_id?:string
        }
    }
}