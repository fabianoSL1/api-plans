FROM node:22 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

RUN npm install --omit=dev

COPY ./entrypoint.sh ./

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
