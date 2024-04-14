FROM node:18-alpine as development

WORKDIR /app

COPY package.json .

# We use apk instead of apt-get because this image is alpine based
RUN apk update 

RUN npm install

COPY . .

EXPOSE 3001
EXPOSE 5555

CMD ["npm", "run", "start:dev"]

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY src/ormconfig.ts ./src/ormconfig.ts
COPY src/data-access/migrations ./src/data-access/migrations
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/ormconfig.ts ./src/ormconfig.ts
COPY --from=builder /app/src/data-access/migrations ./src/data-access/migrations

EXPOSE 3000

CMD [  "npm", "run", "migrate:start:prod" ]