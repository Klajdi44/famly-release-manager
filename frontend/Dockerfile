FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json  .

RUN npm install

COPY ./ .

RUN npm rebuild esbuild

RUN exec "$@"

CMD ["npm", "run", "docker-dev"]
