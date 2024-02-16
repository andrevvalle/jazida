## Instale as dependencias

```bash
npm install
```

## Crie um arquivo .env com o mesmo conteudo do .env.example

## Configuração do Banco de Dados

Rode o ambiente em docker primeiramente e em outro terminal rode a migrate e seed a seguir.

```bash
docker-compose up --build
```

execute as migrações do banco de dados para criar e popular as tabelas necessárias:

```bash
npm run db:migrate && npm run db:seed
```
