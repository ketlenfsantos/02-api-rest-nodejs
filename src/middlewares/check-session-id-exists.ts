/*
middleware é um interceptador, é possivel criar e reaproveita-los

vai executar código antes das rotas, faz verificações, ajuda a não precisar repetir códigos

COLOCA-SE ANTES DA FUNÇÃO O PRE HANDLER + ESSE DOCUMENTO (CHECKSESSIONID) que consta a função que iria ser repetida     
*/

import { FastifyReply, FastifyRequest } from "fastify"


//CHECK DAS SESSION IDS EXISTENTES OU NÃO.

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply){
const sessionId = request.cookies.sessionId //essa sessão VALIDA SE:
    
    if(!sessionId){  //se a session Id EXISTE, se não existir ja retorna um erro
      return reply.status(401).send({
        erro: 'Unauthorized',
      })
    }
}
