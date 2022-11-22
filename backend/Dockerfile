FROM node:18-alpine

FROM node:alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

COPY ./ /app

RUN npm i

CMD ["npm", "run", "start"]
