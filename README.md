
## Resumo:
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fabianosl1_api-plans&metric=alert_status)](https://sonarcloud.io/summary/overall?id=fabianosl1_api-plans)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fabianosl1_api-plans&metric=coverage)](https://sonarcloud.io/summary/overall?id=fabianosl1_api-plans)

Api restful para gerenciamento de planos e produtos.

O projeto foi construido com base na arquitetura hexagonal, procurando manter a distancia entre o dominio e os detalhes de implementação:
```shell
src/
    main.ts
    app.module.ts
    *module/
        application/  # contem os dtos e use cases
        domain/       # entidades e interfaces como de repositorios
        infra/        # implementações das interfaces e controllers
        test/         # testes unitario
```

## Deploy:
> [!WARNING]
> O [Render](https://render.com/) pode demorar até 50 segundos, apenas a primeira é lenta.

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
# requisitos: Docker, Node.js lts/jod
npm install

docker compose up -d database

cp .env.local .env

npx prisma migrate dev

npm run start:dev
```
## Testes:
> [!TIP]
> o banco de dados deve estar online durante os testes e2e

```shell
npm run test

npm run test:e2e
```
> `../infra` não possui cobertura de testes unitarios e não é considerado no code coverage.


## Endpoints:
Os endpoints estão em [collection](./docs/api-collection.json), pode importar em ferramentas como [Postman](https://www.postman.com/) ou [hoppscotch](https://hoppscotch.io/).


