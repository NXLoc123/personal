FROM node:20.6.0

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN npm install @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

