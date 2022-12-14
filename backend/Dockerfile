FROM node:18-slim

WORKDIR /backend

COPY package*.json .

COPY ./ .

RUN npm install && npm cache clean --force

ENTRYPOINT ["sh","./src/config/init.sh"]

