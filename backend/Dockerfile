FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g npm@latest
RUN npm install


COPY . .

RUN chown -R node:node .

USER node

# CMD [ "npm", "run", "start:dev" ]
CMD [ "nodemon", "src/index.ts" ]
