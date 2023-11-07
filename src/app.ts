//ESSE ARQUIVO É PRA FAZER O TESTE AUTOMATIZADO//

import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie) //cria-se cookie para salvar o id do usuário que criou uma transição pra lembrar dps


app.register(transactionsRoutes, {
  prefix: 'transactions',
})
