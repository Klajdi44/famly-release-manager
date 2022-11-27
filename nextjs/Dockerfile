FROM node:18-alpine

WORKDIR /frontend

COPY package.json /frontend/

COPY package-lock.json /frontend/

RUN npm install

COPY ./ /frontend/

EXPOSE 3000

CMD ["npm", "run", "dev"]
