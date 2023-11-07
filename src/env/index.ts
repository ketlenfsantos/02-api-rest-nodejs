import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data















/*import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({ //schema formato de dado, qual formato irei receber das variaves ambientes
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), //ambiente q ta sendo produzido ENUM(uma dentre todas as opções), se nao for, o default é production
  DATABASE_URL: z.string(),  //a database_url tem que ser uma string
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env) 
// metodo Parse pega schema acima, passa os dados do process.env, o zod faz a verificação no process.env (confere)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data

/*VARIÁVEIS DE AMBIENTES: informações que podem ser diferentes a cada ambiente que aplicação ta executando
ambiente de desenvolvimento: quando ta sendo criada
ambiente de produção: quando aplicação ja ta no ar
ambiente de teste: testes automatizados

fica salvo no process.env todos dados. 
etc varios


Ao inves de usar sempre process.env usa-se uma biblioteca especifica para validação de dados, ou seja, validão formatos,
se é uma string, numero, etc : usa-se biblioteca ZOD.

// PASTA ENV, INDEX.TS SALVA OS DADOS DO ZOD





*/

