# syntax=docker/dockerfile:1

FROM node:18.12.1-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3535

CMD yarn start