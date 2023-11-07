
import { config } from './src/database'

export default config

/* KNEX é um query builder, ferramenta para trabalhar com BANCO DE DADOS
Sqlite 
SQLITE é um banco de dados relacional - mais facil, não precisar subir nada no pc.
Todos dados SÃO SALVOS EM ARQUIVOS FISICOS dentro do projeto.

Estrategias/formas de conexão com o banco de dados: mais comuns
- drivers nativos: ferramentas e bibliotecas que permitem se comunicar com o banco de maneira "crua"
- query builders: construtor de queryes (codigos, sqls) mistura codigo JS com código do banco,. ex:

knex (query builder: quero buscar todos ->)('users" (buscar todos usuários)).where(metodo JS: ONDE){
    first_name(buscar o primeiro nome):'TESTE' (primeiro nome seja teste)
    last_name(que o ultimo nome seja:):"User"})
    .select(metodo JS: e desses usuários quero que selecione somente o :) : ('id')



*/