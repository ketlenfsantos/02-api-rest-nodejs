import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) { //exporta o plugin, função async
 
  //para criar um handler global//

  

 
  //LISTAGEM DA TRANSAÇÃO
  app.get(
    '/' ,  //quando usuário acessar pasta raiz (transactions)
    {
     preHandler: [checkSessionIdExists],  //antes de executar o handler(função abaixo), ele ira executar o documento 
                                          //checksessionId onde consta a função que iria ser aplicada em todas
  },                                      //se a session ID existir, o handler abaixo continua. 
  
  async (request, reply) => {

    const {sessionId} = request.cookies //criou uma constante de objeto rpa validar sessionId abaixo

    const transactions = await knex ('transactions')
    .where('session_id', sessionId) //listar somente o usuário q ta logado
    .select()

    return { transactions }

  })

 //LISTAGEM DE UMA TRANSAÇÃO ESPECÍFICA

  app.get ('/:id', {
    preHandler: [checkSessionIdExists],  
                                         
  }, async (request) => {
    const getTransactionParamsSchema = z.object ({ //utiliza-se zod para identificar o ID
      id: z.string().uuid(),
    })   
     
    const {id} = getTransactionParamsSchema.parse(request.params)

    const {sessionId} = request.cookies

     //get que busca detalhes de uma transição unica, para identificar uma transição:

     const transaction = await knex ('transactions')
     .where({
      session_id: sessionId,
      id,
     })
     .first() //first: pra achar somente primeiro resultado

     return {transaction}
  })

// RESUMO DA SUA CONTA

app.get('/summary' , {
  preHandler: [checkSessionIdExists],  
                                       
},  async (request) => { //cria uma query para o banco de dados
const { sessionId } = request.cookies
const summary = await knex ('transactions')
.where('session_id', sessionId)
.sum('amount' , { as: 'amount'})  //coloca-se o as para nomear o amount 
.first()

return { summary }

})

  app.post('/', async (request, reply) => { //criando uma rota transaction('/' ja ta salvo)
    const createTransactionBodySchema = z.object({ //dentro do reqbody(objeto) quero 3 infos
      title: z.string(), // titulo da transição
      amount: z.number(), //valor 
      type: z.enum(['credit', 'debit']), //tipo: se é credito (valor total) ou débito (que ira diminuir)
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
     request.body,  //req body de onde vem os dados, preenchidos do formulário
    )

    // para salvar um usuário que criou uma transição, e o app lembrar dele sem precisar criar de novo, usa-se 
    //cookies + session ID para salvar os dados deste usuário

    //usa-se let pois é uma variavel q pode mudar  
    let sessionId = request.cookies.sessionId  //procura nos cookies, se já ha uma session ID (usuario ja criado)
      //CASO NÃO EXISTIR AINDA, esse session id: 
     if (!sessionId) {
      sessionId = randomUUID() //vai criar um session id novo nos cookies
    
      reply.cookie('sessionId', sessionId, {
        path: '/', //quais rotas o cookie pode acessar
        maxAge:1000 * 60 * 60 * 24 * 7 , //QUANTO TEMPO COOKIE VAI FUNCIONAR (7DIAS) (ms x)

      })
    
    }



    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,  
      session_id: sessionId,
      //se for do tipo cred utilizar amount do jeito q ta, se for débito vou multiplicar o amount por -1 (por ser debito)
      //para n alterar a coluna amount na migration
    })

    return reply.status(201).send()
  })
}


/*
Plugins: forma de separar pequenos pedacinhos em mais arquivos - USA-SE O FASTIFY
TEM QUE OBRIGATÓRIAMENTE SER UMA FUNÇÃO ASSINCRONA


Cookies - forma de manter CONTEXTO entre requisições.
No momento em que eu aceito COOKIES, ele salva uma informação de ID, é uma forma do site/aplicação validar que a mesma 
pessoa fez tais requisições (dentro do site, app), fica salvo em um histórico. Coleta tudo o que você esta fazendo.   



*/


