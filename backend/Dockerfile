FROM node:18-slim

WORKDIR /app

COPY package*.json .

COPY ./ .

RUN npm install && npm cache clean --force

ENTRYPOINT ["sh","./src/config/init.sh"]

