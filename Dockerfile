# Build dependencies
FROM node:18-alpine as dependencies
WORKDIR /app

COPY package.json .


RUN yarn install
COPY . . 

# Build production image
FROM dependencies as builder
ENV NODE_ENV=production
RUN yarn build
CMD yarn start