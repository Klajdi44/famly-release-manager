FROM node:18-alpine

WORKDIR /frontend

COPY package.json /frontend/

COPY package-lock.json /frontend/

RUN npm install

COPY ./ /frontend/

RUN npm rebuild esbuild

RUN exec "$@"

CMD ["npm", "run", "docker-dev"]
