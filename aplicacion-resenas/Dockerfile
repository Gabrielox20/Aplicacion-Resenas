# syntax=docker/dockerfile:1
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]
