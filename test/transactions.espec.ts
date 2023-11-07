import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})













/*import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll( async () => {   //dentro dela eu posso executar algum código antes que execute os outros testes
await app.ready()

    //antes de todos os testes eu quero aguardar que o app esteja pronto
})

afterAll(async () => {  //afterall é executar DEPOIS do teste

await app.close(

)
    //depois que todos testes foirem executados, quero remover a aplicação da memoria
})

//fazer uma chama http para criar uma nova transaçã
test ('o usuário consegue criar uma nova transação', async () =>{
const response = await request(app.server)
.post('/transactions')
.send({
title:'new transaction',
amount: 5000,
type: 'credit', 
})
.expect(201)

//validação pra ver se foi bem sucesdido, usa-se metodo expect (eu espero q o codigo seja tal)


//espero uma resposta do status seja igual 201

})









/* testes automatizados - importante para backend
Os testes automatizados desempenham um papel crucial no desenvolvimento de software, garantindo a qualidade, a confiabilidade e a manutenibilidade do código. Os testes são fundamentais para assegurar que as funcionalidades do sistema estejam funcionando corretamente.


3 tipos mais famosos:

- Unitários: testam exclusivamente uma UNIDADE da sua aplicação, uma pequena parte de forma isolada
ex: possuí uma função que formata data, voce pode pegar essa função e verifica ela sozinha. Não precisa testar na rota e
com outro contexto. (MAIS COMUM)
- Integração: quando testa COMUNICAÇÃO em duas ou mais unidades (duas funções por exemplo)
- e2e - ponta a pont : simulam um USUÁRIO operando na nossa aplicação. 

Piramide de testes: cada teste tem algumas exigencias

E2E - indicado primeiro pra testar, nao depende de nenhuma tecnologia. Porém são lentos. */


