FROM node:18-alpine

WORKDIR /frontend

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY package.json /frontend/

COPY package-lock.json /frontend/

RUN npm install

COPY ./ /frontend/

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "docker-dev"]
