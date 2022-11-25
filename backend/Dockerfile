FROM node:18-alpine

WORKDIR /backend

COPY package.json /backend/

COPY package-lock.json /backend/

COPY ./ /backend/

RUN npm i

ENTRYPOINT ["sh","./src/config/init.sh"]

