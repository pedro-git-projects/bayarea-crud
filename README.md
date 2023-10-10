** CRUD API Todo List Bayarea**

Este projeto é um backend para um CRUD de uma lista de tarefas. Ele foi desenvolvido usando NestJS e Prisma.

**Requisitos**

* Node.js
* Docker

**Instalação**

1. Clone o repositório:

```
git clone https://github.com/pedro-git-projects/bayarea-crud.git
```

2. Instale as dependências:

```
cd crud-todolist-bayarea-backend
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
DATABASE_URL="postgresql://username:password@host:port/database_name?schema=schema_name"
JWT_SECRET="seu segredo"
```

4. Crie um arquivo `docker-compose.yml`
```dockerfile
version: '3'
services:
  postgres:
    image: 'postgres:14.5'
    restart: always
    environment:
      POSTGRES_USER: <seu usuario> 
      POSTGRES_PASSWORD: <sua senha> 
      POSTGRES_DB: todo 
    logging:
      options:
        max-size: 10m
        max-file: "3"
    ports:
      - '5435:5432'
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
      - ./sql/users.sql:/docker-entrypoint-initdb.d/create_tables.sql
```

**Execução**

Para executar o projeto, execute o seguinte comando:

```
docker-compose up -d
```

O projeto estará disponível na porta 3000.

**Endpoints**

Os endpoints do projeto são os seguintes:

* **POST /signup** - Cria um novo usuário recebendo o token de acesso.
* **POST /signin ** - Loga em um usuário existente recebendo o token de acesso.

* **GET /todo** - Retorna uma lista de todos os itens da lista de tarefas do usuário logado.
* **POST /todo** - Cria um novo item na lista de tarefas para o usuário logado.
* **PATCH /todo** - Altera o todo com id determinado no corpo da requisição.
* **DELETE /todo/** - Exclui um item da lista de tarefas para um usuário logado com o id da tarefa passado pelo corpo da requisição.

**Exemplos**

Para criar um novo item na lista de tarefas, envie uma requisição POST para o endpoint `/todo` com o seguinte corpo:

```json
{
	"name": "tarefa legal",
	"deadline": "2023-10-15",
	"status": "pending"
}
```


Para atualizar um item da lista de tarefas, envie uma requisição PUT para o endpoint `/todo` com o seguinte corpo:

```json
{
   "id": 5,
   "name": "Novo nome"
}
```

Para excluir um item da lista de tarefas, envie uma requisição DELETE para o endpoint `/todo`.

```json
{
	"todoId": 9
}
```
