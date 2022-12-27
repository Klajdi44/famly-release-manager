FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY ./ .

ENTRYPOINT ["sh","entrypoint.sh"]


