## Resumo:

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fabianosl1_api-plans&metric=alert_status)](https://sonarcloud.io/summary/overall?id=fabianosl1_api-plans)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fabianosl1_api-plans&metric=coverage)](https://sonarcloud.io/summary/overall?id=fabianosl1_api-plans)

Api restful para gerenciamento de planos e produtos.

O projeto foi construído com base na arquitetura hexagonal, procurando manter a separação entre o domínio e os detalhes de implementação:

```shell
src/
    main.ts
    app.module.ts
    *module/
        application/  # contem os dtos e use cases
        domain/       # entidades e interfaces como de repositorios
        infra/        # controllers e implementações das interfaces
        test/         # testes unitario
```

Para evoluir o projeto, poderiamos implementar cache caso a api tiver um grande volume de buscas. Além disso, poderiamos utilizar serviço de mensageria para processamento assíncrono por exemplo: quando registrar um novo produto em determinado plano, notificar todos os usuários do plano por email e telefone.

## Deploy:

> [!WARNING]
> O [Render](https://render.com/) pode demorar até 50 segundos para iniciar, apenas a primeira requisição é lenta.

https://api-plans-ryny.onrender.com

Tanto a aplicação quanto o banco de dados estão na plataforma [Render](https://render.com/).

## Dev:

> http://localhost:3000

```shell
# requisitos: Docker
docker compose up
```

ou

```shell
# requisitos: Docker e Node.js lts/jod
npm install

docker compose up -d database

cp .env.local .env

npx prisma migrate dev

npm run start:dev
```

## Testes:

> [!TIP]
> O banco de dados deve estar online durante os testes e2e.

```shell
npm run test

npm run test:e2e
```

> `../infra` não possui cobertura de testes unitarios e não é considerado no code coverage do SonarQube.

## Endpoints:

Os endpoints estão em [collection](./docs/api-collection.json), que pode ser importado em ferramentas como [Postman](https://www.postman.com/) ou [hoppscotch](https://hoppscotch.io/).

## Stack:

###### app

- Nest.js
- TypeScript
- Prisma

###### tests

- Jest
- Supertest

###### ambiente

- Docker
- Husky

###### ferramentas

- SonarQube
- Render
- Github Actions
