FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist/main.js"]