const express = require("express") // express é um pacote
const cors = require("cors") // módulo de segurança
const routes = require("./routes") //importando as routes do arquivo routes.js
// o ./ serve pra refernciar a mesma pasta onde está o index.js

const app = express()
app.use(cors())
app.use(express.json()) // isso fala pro express ir no corpo das requisições e converter o json em objeto do javascript
app.use(routes)

app.listen(3333)

// MÉTODOS HTTP -
// o .get busca uma informação no backend
//o .post criar uma informação no backend
//o .put alterar uma informação no backend
//o .delete apaga uma informação no backend

/* TIPOS DE PARÂMETROS

Query Params - parâmetros nomeados enviados na rota após o "?"... serve pra filtros, paginação
exemplo http://localhost:3333/users?page=2&name=Diego&idade=30

Route Params - Parâmetros utilizados para identificar recursos
por exemplo, quero buscar dados de um único usuário
app.get('/users/:id) ==> http://localhost:3333/users/1 (buscar usuário 1)

Request Body - é o corpo da requisição,, utilizado para criar ou alterar recursos.

----------------------------
BANCO DE DADOS

3 formas de configurar

Driver - pacote ofical do banco de dados pra node...  
SELECT * FROM users

Query Builder - escreve as querys utilizando javascript. usar o KNEX.JS
table('users').select('*').where()





*/
